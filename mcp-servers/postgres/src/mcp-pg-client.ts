#!/usr/bin/env node

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { argv } from 'process';

// Command line arguments
const args = argv.slice(2);
const command = args[0] || 'list-tables';

// Spawn MCP server process - let it use the DATABASE_URL from .env
console.log('Starting MCP server...');
const serverProcess: ChildProcessWithoutNullStreams = spawn('node', ['dist/index.js'], {
  stdio: 'pipe' 
});

// Handle data from server
let buffer = '';
let currentStep = 'init';
let nextAction = '';

// Process the response and determine the next step
function processResponse(response: any) {
  console.log(`Step: ${currentStep}, Response ID: ${response.id}`);
  
  if (currentStep === 'init' && response.id === 1) {
    // After initialization, execute the requested command
    currentStep = 'command';
    
    if (command === 'list-tables') {
      // List tables using resources/list
      const listResourcesRequest = {
        jsonrpc: '2.0',
        method: 'resources/list',
        params: {},
        id: 2
      };
      console.log('Listing database tables...');
      serverProcess.stdin.write(JSON.stringify(listResourcesRequest) + '\n');
    } else if (command === 'schema' && args[1]) {
      // Get schema for a specific table
      const tableName = args[1];
      const uri = `postgres://localhost:5432/postgres/${tableName}/schema`;
      
      const readResourceRequest = {
        jsonrpc: '2.0',
        method: 'resources/read',
        params: {
          uri
        },
        id: 2
      };
      console.log(`Getting schema for table: ${tableName}`);
      serverProcess.stdin.write(JSON.stringify(readResourceRequest) + '\n');
    } else if (command === 'query' && args[1]) {
      // Execute SQL query
      const sql = args[1];
      const queryRequest = {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'query',
          arguments: {
            sql
          }
        },
        id: 2
      };
      console.log(`Executing SQL query: ${sql}`);
      serverProcess.stdin.write(JSON.stringify(queryRequest) + '\n');
    } else {
      console.error('Invalid command or missing arguments.');
      console.error('Usage:');
      console.error('  node dist/mcp-pg-client.js list-tables');
      console.error('  node dist/mcp-pg-client.js schema <table_name>');
      console.error('  node dist/mcp-pg-client.js query "<sql_query>"');
      serverProcess.stdin.end();
      setTimeout(() => process.exit(1), 100);
    }
  } else if (currentStep === 'command' && response.id === 2) {
    // Handle different command responses
    if (command === 'list-tables' && response.result && response.result.resources) {
      console.log('\nAvailable tables:');
      const resources = response.result.resources;
      if (resources.length === 0) {
        console.log('No tables found.');
      } else {
        resources.forEach((resource: any, index: number) => {
          const tableName = resource.uri.split('/').slice(-2)[0];
          console.log(`${index + 1}. ${tableName} - ${resource.name}`);
        });
      }
    } else if (command === 'schema' && response.result && response.result.contents) {
      console.log('\nTable schema:');
      const content = response.result.contents[0];
      if (content && content.text) {
        const schema = JSON.parse(content.text);
        console.table(schema);
      } else {
        console.log('No schema found or empty schema.');
      }
    } else if (command === 'query' && response.result && response.result.content) {
      console.log('\nQuery results:');
      const content = response.result.content[0];
      if (content && content.type === 'text') {
        const rows = JSON.parse(content.text);
        if (rows.length === 0) {
          console.log('No data returned.');
        } else {
          console.table(rows);
        }
      } else {
        console.log('No results or unexpected result format.');
      }
    } else if (response.error) {
      console.error('Error:', response.error);
    }
    
    // Exit after handling the command response
    serverProcess.stdin.end();
    setTimeout(() => process.exit(0), 100);
  }
}

// Handle data coming from the server
serverProcess.stdout.on('data', (data: Buffer) => {
  buffer += data.toString();
  try {
    const response = JSON.parse(buffer);
    buffer = '';
    processResponse(response);
  } catch (e) {
    // Not a complete JSON yet, continue collecting data
  }
});

// Handle server errors
serverProcess.stderr.on('data', (data: Buffer) => {
  // Filter out debug messages
  const message = data.toString();
  if (!message.startsWith('DEBUG:')) {
    console.error(`Server error: ${message}`);
  }
});

// Handle server exit
serverProcess.on('exit', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// First, send the initialize request
const initRequest = {
  jsonrpc: '2.0',
  method: 'initialize',
  params: {
    protocolVersion: '0.1.0',
    clientInfo: {
      name: 'postgres-client',
      version: '0.1.0'
    },
    capabilities: {}
  },
  id: 1
};

console.log('Initializing MCP server...');
serverProcess.stdin.write(JSON.stringify(initRequest) + '\n'); 