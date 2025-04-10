#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Create server
const server = new Server(
  {
    name: "mcp-servers/postgres",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  },
);

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
    console.error('DEBUG: Detected potential SSL certificate issue, adding sslmode=no-verify');
    return dbUrl.includes('?') 
      ? `${dbUrl}&sslmode=no-verify` 
      : `${dbUrl}?sslmode=no-verify`;
  }
  
  return dbUrl;
}

// Helper function to load environment variables from .env file
function loadEnvFile(): string {
  try {
    // First check for user's Cursor MCP config file (highest priority)
    const homedir = process.env.HOME || process.env.USERPROFILE;
    if (homedir) {
      const mcpConfigPath = path.join(homedir, ".cursor", "mcp.json");
      if (fs.existsSync(mcpConfigPath)) {
        try {
          const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf-8'));
          // Check if postgres section has a databaseUrl property
          if (mcpConfig.mcpServers?.postgres?.databaseUrl) {
            console.error("Using database URL from Cursor MCP config file (highest priority)");
            return mcpConfig.mcpServers.postgres.databaseUrl;
          }
        } catch (e) {
          console.error("Failed to parse MCP config file:", e);
        }
      }
    }
    
    // Check for MCP_CONFIG environment variable which may contain database URL (second priority)
    if (process.env.MCP_CONFIG) {
      try {
        const mcpConfig = JSON.parse(process.env.MCP_CONFIG);
        if (mcpConfig.databaseUrl) {
          console.error("Using database URL from MCP_CONFIG environment variable");
          return mcpConfig.databaseUrl;
        }
      } catch (e) {
        console.error("Failed to parse MCP_CONFIG environment variable:", e);
      }
    }
    
    // Try different paths for .env file (third priority)
    const paths = [
      // Current working directory
      process.cwd(),
      // Directory passed as argument
      ...(process.argv.length > 2 ? [process.argv[2]] : []),
      // Directory of the script
      path.dirname(fileURLToPath(import.meta.url)),
      // Parent of script directory
      path.dirname(path.dirname(fileURLToPath(import.meta.url)))
    ];
    
    for (const basePath of paths) {
      const envPath = path.resolve(basePath, '.env');
      if (fs.existsSync(envPath)) {
        console.error(`Found .env file at: ${envPath}`);
        const envContent = fs.readFileSync(envPath, 'utf-8');
        
        let databaseUrl = "";
        
        // Parse .env file to find DATABASE_URL
        envContent.split('\n').forEach(line => {
          const match = line.match(/^DATABASE_URL=(.*)$/);
          if (match) {
            databaseUrl = match[1];
            const maskedUrl = databaseUrl.replace(/\/\/([^:]+):[^@]+@/, '//***:***@');
            console.error(`Using DATABASE_URL from .env: ${maskedUrl}`);
          }
          
          // Also apply other environment variables
          const envMatch = line.match(/^([^=]+)=(.*)$/);
          if (envMatch) {
            process.env[envMatch[1]] = envMatch[2];
          }
        });
        
        if (databaseUrl) {
          return databaseUrl;
        }
      }
    }
    
    console.error("No database URL found in MCP config or .env files");
    return "";
  } catch (error) {
    console.error('Error loading database configuration:', error);
    return "";
  }
}

// Get database URL with following priority:
// 1. Command line argument
// 2. MCP config file (mcp.json) databaseUrl
// 3. MCP_CONFIG environment variable
// 4. .env file in current or script directory
// 5. Default connection string
const args = process.argv.slice(2);
let databaseUrl = args.length > 0 ? args[0] : "";
if (!databaseUrl) {
  databaseUrl = loadEnvFile();
}
if (!databaseUrl) {
  databaseUrl = "postgres://postgres:postgres@localhost:5432/postgres";
}

// Apply SSL fix if needed
databaseUrl = fixSSLConnectionString(databaseUrl);
console.error(`DEBUG: Final database URL: ${databaseUrl.replace(/\/\/([^:]+):[^@]+@/, '//***:***@')}`);

// Create resource base URL without sensitive data
const resourceBaseUrl = new URL(databaseUrl);
resourceBaseUrl.protocol = "postgres:";
resourceBaseUrl.password = "";

// Create PostgreSQL connection pool
let pool = new pg.Pool({
  connectionString: databaseUrl,
});

// Function to refresh database connection if needed
async function refreshConnection(): Promise<boolean> {
  const newDbUrl = loadEnvFile();
  if (newDbUrl && newDbUrl !== databaseUrl) {
    console.error('DEBUG: Database URL changed, updating connection');
    
    const newUrl = fixSSLConnectionString(newDbUrl);
    
    try {
      // Close the existing pool
      await pool.end();
      
      // Create a new pool
      pool = new pg.Pool({
        connectionString: newUrl,
      });
      
      // Update the database URL
      databaseUrl = newUrl;
      console.error(`DEBUG: Connection updated to: ${newUrl.replace(/\/\/([^:]+):[^@]+@/, '//***:***@')}`);
      
      // Update resource base URL
      const newResourceBaseUrl = new URL(databaseUrl);
      newResourceBaseUrl.protocol = "postgres:";
      newResourceBaseUrl.password = "";
      Object.assign(resourceBaseUrl, newResourceBaseUrl);
      
      return true;
    } catch (error) {
      console.error('Error updating connection:', error);
      return false;
    }
  }
  return false;
}

const SCHEMA_PATH = "schema";

// Print debug info about the schemas
console.error('DEBUG: ListResourcesRequestSchema method:', ListResourcesRequestSchema.shape.method.value);
console.error('DEBUG: ReadResourceRequestSchema method:', ReadResourceRequestSchema.shape.method.value);
console.error('DEBUG: ListToolsRequestSchema method:', ListToolsRequestSchema.shape.method.value);
console.error('DEBUG: CallToolRequestSchema method:', CallToolRequestSchema.shape.method.value);

// List available database tables as resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  await refreshConnection();
  
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    );

    return {
      resources: result.rows.map((row) => ({
        uri: new URL(`${row.table_name}/${SCHEMA_PATH}`, resourceBaseUrl).href,
        mimeType: "application/json",
        name: `"${row.table_name}" database schema`,
      })),
    };
  } finally {
    client.release();
  }
});

// Read resource (table schema)
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  await refreshConnection();
  
  const resourceUrl = new URL(request.params.uri);
  const pathComponents = resourceUrl.pathname.split("/");
  const schema = pathComponents.pop();
  const tableName = pathComponents.pop();

  if (schema !== SCHEMA_PATH) {
    throw new Error("Invalid resource URI");
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1",
      [tableName],
    );

    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/json",
          text: JSON.stringify(result.rows, null, 2),
        },
      ],
    };
  } finally {
    client.release();
  }
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query",
        description: "Run a read-only SQL query",
        inputSchema: {
          type: "object",
          properties: {
            sql: { type: "string" },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  console.error('DEBUG: Received callTool request:', JSON.stringify(request));
  
  await refreshConnection();
  
  if (request.params.name === "query") {
    const sql = request.params.arguments?.sql as string;
    const client = await pool.connect();
    
    try {
      await client.query("BEGIN TRANSACTION READ ONLY");
      const result = await client.query(sql);
      
      return {
        content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }],
        isError: false,
      };
    } catch (error) {
      throw error;
    } finally {
      client
        .query("ROLLBACK")
        .catch((error) =>
          console.warn("Could not roll back transaction:", error),
        );
      client.release();
    }
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Run server
async function runServer() {
  const transport = new StdioServerTransport();
  
  // Handle shutdown gracefully
  process.on("SIGINT", async () => {
    console.error("Shutting down...");
    await pool.end();
    process.exit(0);
  });
  
  // Connect to server transport
  await server.connect(transport);
}

// Start server
runServer().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
}); 