#!/usr/bin/env node

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

// Database URL
const databaseUrl = "postgres://postgres:postgres@localhost:5432/postgres";

// Spawn MCP server process
const serverProcess: ChildProcessWithoutNullStreams = spawn('node', ['dist/index.js', databaseUrl], {
  stdio: 'pipe' 
});

// Handle data from server
let buffer = '';
serverProcess.stdout.on('data', (data: Buffer) => {
  buffer += data.toString();
  processBuffer();
});

// Process buffer to find complete JSON responses
function processBuffer() {
  try {
    const response = JSON.parse(buffer);
    console.log('Received response:', response);
    
    // Clear buffer after successful parsing
    buffer = '';
    
    // Handle response based on request
    handleResponse(response);
  } catch (e) {
    // Not a complete JSON response yet
  }
}

// Step 1: Initialize the server
const initializeRequest = {
  jsonrpc: '2.0',
  method: 'initialize',
  params: {
    protocolVersion: '0.1.0',
    clientInfo: {
      name: 'mcp-postgres-client',
      version: '0.1.0'
    },
    capabilities: {}
  },
  id: 1
};

// Step 2: Send initialized notification
const initializedNotification = {
  jsonrpc: '2.0',
  method: 'initialized',
  params: {}
};

// Step 3: List tools
const listToolsRequest = {
  jsonrpc: '2.0',
  method: 'listTools',
  params: {},
  id: 2
};

// Step 4: Execute a SQL query
const queryRequest = {
  jsonrpc: '2.0',
  method: 'callTool',
  params: {
    name: 'query',
    arguments: {
      sql: 'SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\''
    }
  },
  id: 3
};

// Track current step
let currentStep = 1;

// Handle responses based on the current step
function handleResponse(response: any) {
  if (response.id === 1) {
    // Initialization response received, send initialized notification
    console.log('Server initialized, sending initialized notification...');
    serverProcess.stdin.write(JSON.stringify(initializedNotification) + '\n');
    
    // Then list tools
    console.log('Requesting tool list...');
    serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');
    currentStep = 2;
  } else if (response.id === 2) {
    // Tools list response received, proceed to send query
    console.log('Tool list received, sending SQL query...');
    serverProcess.stdin.write(JSON.stringify(queryRequest) + '\n');
    currentStep = 3;
  } else if (response.id === 3) {
    // Query response received
    if (response.result) {
      console.log('Query results:');
      if (response.result.content && response.result.content[0].type === 'text') {
        const results = JSON.parse(response.result.content[0].text);
        console.table(results);
      } else {
        console.log(response.result);
      }
    } else if (response.error) {
      console.error('Query error:', response.error);
    }
    
    // Close the connection
    serverProcess.stdin.end();
    setTimeout(() => process.exit(), 500);
  }
}

// Send initialization request
console.log('Initializing MCP server...');
serverProcess.stdin.write(JSON.stringify(initializeRequest) + '\n');

// Handle server exit
serverProcess.on('exit', (code) => {
  console.log(`Server process exited with code ${code}`);
}); 