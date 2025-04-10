#!/usr/bin/env node

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

// Database URL
const databaseUrl = "postgres://postgres:postgres@localhost:5432/postgres";

// The SQL query to execute
const sql = process.argv[2] || "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";

// Spawn MCP server process
console.log(`Starting MCP server with database: ${databaseUrl}`);
const serverProcess: ChildProcessWithoutNullStreams = spawn('node', ['dist/index.js', databaseUrl], {
  stdio: 'pipe' 
});

// Handle data from server
let buffer = '';
let requestId = 0;
let currentStep = 'init';

// Process the response and determine the next step
function processResponse(response: any) {
  console.log(`Step: ${currentStep}, Response:`, JSON.stringify(response, null, 2));
  
  if (currentStep === 'init' && response.id === 1) {
    // After initialization, send the query
    currentStep = 'query';
    
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
  } else if (currentStep === 'query' && response.id === 2) {
    // Query response received
    if (response.result && response.result.content && response.result.content[0].type === 'text') {
      try {
        const rows = JSON.parse(response.result.content[0].text);
        console.log('Query results:');
        console.table(rows);
      } catch (e) {
        console.log('Raw result:', response.result.content[0].text);
      }
    } else if (response.error) {
      console.error('Query error:', response.error);
    }
    
    // Exit after getting the query response
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
  console.error(`Server error: ${data.toString()}`);
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