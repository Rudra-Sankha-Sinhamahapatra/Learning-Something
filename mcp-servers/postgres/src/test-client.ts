#!/usr/bin/env node

import { spawn } from 'child_process';

const databaseUrl = "postgres://postgres:postgres@localhost:5432/postgres";

class McpClient {
  private serverProcess: any;
  private buffer: string = '';
  private isProcessingRpc: boolean = false;
  private rpcResponseHandler: ((data: any) => void) | null = null;

  constructor() {
    // Spawn the MCP server process with the database URL
    this.serverProcess = spawn('node', ['dist/index.js', databaseUrl], {
      stdio: ['pipe', 'pipe', process.stderr]
    });

    // Set up event handlers
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // Handle data from server
    this.serverProcess.stdout.on('data', (data: Buffer) => {
      this.buffer += data.toString();
      this.tryProcessRpcResponse();
    });

    // Handle server exit
    this.serverProcess.on('exit', (code: number) => {
      console.log(`MCP server exited with code ${code}`);
    });

    // Handle server errors
    this.serverProcess.on('error', (err: Error) => {
      console.error('MCP server error:', err);
    });
  }

  private tryProcessRpcResponse() {
    if (this.isProcessingRpc || !this.buffer.trim() || !this.rpcResponseHandler) {
      return;
    }

    try {
      this.isProcessingRpc = true;
      const response = JSON.parse(this.buffer);
      this.buffer = '';
      
      if (this.rpcResponseHandler) {
        this.rpcResponseHandler(response);
        this.rpcResponseHandler = null;
      }
    } catch (e) {
      // Not a complete JSON object yet, wait for more data
    } finally {
      this.isProcessingRpc = false;
    }
  }

  async sendRequest(method: string, params: any): Promise<any> {
    const request = {
      jsonrpc: '2.0',
      method,
      params,
      id: 1
    };

    return new Promise((resolve, reject) => {
      this.rpcResponseHandler = resolve;
      this.serverProcess.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  async listResources(): Promise<any> {
    console.log('Listing database tables...');
    return this.sendRequest('listResources', {});
  }

  async readResource(uri: string): Promise<any> {
    console.log(`Reading resource: ${uri}`);
    return this.sendRequest('readResource', { uri });
  }

  async executeQuery(sql: string): Promise<any> {
    console.log(`Executing SQL query: ${sql}`);
    return this.sendRequest('callTool', {
      name: 'query',
      arguments: { sql }
    });
  }

  close() {
    this.serverProcess.kill();
  }
}

async function runTests() {
  const client = new McpClient();
  
  try {
    // Test 1: List database tables
    console.log('\n=== TEST 1: Listing database tables ===');
    const tablesResponse = await client.listResources();
    console.log('Response:', JSON.stringify(tablesResponse, null, 2));

    if (tablesResponse?.result?.resources?.length > 0) {
      const resources = tablesResponse.result.resources;
      console.log(`Found ${resources.length} tables.`);
      
      // Test 2: Get schema for the first table
      console.log('\n=== TEST 2: Getting schema for the first table ===');
      const uri = resources[0].uri;
      const tableName = uri.split('/').slice(-2)[0];
      console.log(`Getting schema for table: ${tableName}`);
      
      const schemaResponse = await client.readResource(uri);
      console.log('Response:', JSON.stringify(schemaResponse, null, 2));
      
      // Test 3: Run a simple query on the first table
      console.log('\n=== TEST 3: Running a query on the first table ===');
      const queryResponse = await client.executeQuery(`SELECT * FROM ${tableName} LIMIT 5`);
      console.log('Response:', JSON.stringify(queryResponse, null, 2));
    } else {
      // If no tables found, run a test query to get tables
      console.log('No tables found. Running a query to get table information...');
      const queryResponse = await client.executeQuery(
        'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\''
      );
      console.log('Response:', JSON.stringify(queryResponse, null, 2));
    }
  } catch (error) {
    console.error('Error during tests:', error);
  } finally {
    client.close();
  }
}

runTests().catch(console.error); 