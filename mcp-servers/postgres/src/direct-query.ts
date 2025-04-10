#!/usr/bin/env node

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper function to fix SSL connection issues automatically
function fixSSLConnectionString(dbUrl: string): string {
  // List of cloud providers that often need no-verify
  const needsNoVerify = [
    'aivencloud.com',
    'rds.amazonaws.com',
    'azure.com',
    'digitaloceanspaces.com'
  ];
  
  // Check if the URL contains any of the indicators
  const needsNoVerifyFix = needsNoVerify.some(provider => dbUrl.includes(provider)) || 
                          dbUrl.includes('ssl') || 
                          dbUrl.includes('cert');
  
  // If URL needs fixing and doesn't already have sslmode parameter
  if (needsNoVerifyFix && !dbUrl.includes('sslmode=')) {
    console.log('Detected potential SSL certificate issue, adding sslmode=no-verify');
    return dbUrl.includes('?') 
      ? `${dbUrl}&sslmode=no-verify` 
      : `${dbUrl}?sslmode=no-verify`;
  }
  
  return dbUrl;
}

// Load environment variables from .env file
function loadEnvFile() {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const envPath = path.resolve(__dirname, '../.env');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const envVars: Record<string, string> = {};
      
      envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          envVars[match[1]] = match[2];
        }
      });
      
      // Apply env vars to process.env
      Object.assign(process.env, envVars);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error loading .env file:', error);
    return false;
  }
}

// Load the environment variables
const envLoaded = loadEnvFile();
console.log(`Environment variables loaded from .env: ${envLoaded}`);

// Get database URL from environment or command line args or use default
const args = process.argv.slice(2);
let databaseUrl = args[0] || process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";

// Apply SSL fix if needed
databaseUrl = fixSSLConnectionString(databaseUrl);

// The SQL query to execute
const sql = args[1] || "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";

// Spawn MCP server process
console.log(`Starting MCP server with database URL (sensitive info masked): ${databaseUrl.replace(/\/\/([^:]+):[^@]+@/, '//***:***@')}`);
const serverProcess: ChildProcessWithoutNullStreams = spawn('node', ['dist/index.js', databaseUrl], {
  stdio: 'pipe' 
});

// Handle data from server
let buffer = '';
serverProcess.stdout.on('data', (data: Buffer) => {
  buffer += data.toString();
  try {
    const response = JSON.parse(buffer);
    console.log('Response:', JSON.stringify(response, null, 2));
    buffer = '';
    
    if (response.result && response.result.content && response.result.content[0].type === 'text') {
      try {
        const rows = JSON.parse(response.result.content[0].text);
        console.log('Query results:');
        console.table(rows);
      } catch (e) {
        console.log('Raw result:', response.result.content[0].text);
      }
    }
    
    // Exit after getting the response
    serverProcess.stdin.end();
    setTimeout(() => process.exit(0), 100);
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

// Construct the callTool request
const request = {
  jsonrpc: '2.0',
  method: 'tools/call',
  params: {
    name: 'query',
    arguments: {
      sql
    }
  },
  id: 1
};

// Send the request to the server
console.log(`Executing SQL query: ${sql}`);
serverProcess.stdin.write(JSON.stringify(request) + '\n');