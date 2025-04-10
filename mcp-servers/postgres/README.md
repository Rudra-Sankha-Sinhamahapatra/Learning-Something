# PostgreSQL MCP Server

A Model Context Protocol (MCP) server that provides access to PostgreSQL data.

## Prerequisites

- Node.js 16 or higher
- PostgreSQL server
- pnpm (or npm/yarn)

## Installation

```bash
# Install dependencies
pnpm install
```

## Configuration

The server can be configured using several methods, in the following priority order:

1. Command-line argument
2. Environment variables (in .env file or system environment)
3. Default fallback value

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection URL | postgres://postgres:postgres@localhost:5432/postgres |

### Using environment file (.env)

Create a `.env` file in the root directory:

```
DATABASE_URL=postgres://username:password@host:port/database
```

### Using command-line argument

```bash
node dist/index.js "postgres://username:password@host:port/database"
```

### SSL Configuration

When connecting to PostgreSQL databases that use SSL (especially cloud providers like Aiven), you may need to specify an SSL mode in your connection string:

| SSL Mode | Description |
|----------|-------------|
| `require` | Requires SSL connection but doesn't verify certificates (minimal security) |
| `verify-ca` | Verifies that server certificate is signed by a trusted CA (recommended) |
| `verify-full` | Verifies server certificate and hostname (most secure) |
| `no-verify` | Uses SSL but doesn't verify certificates (workaround for self-signed certs) |

For Aiven PostgreSQL databases, you may encounter "self-signed certificate in certificate chain" errors. To fix this:

1. **Preferred solution**: Download Aiven's CA certificate and use it with `verify-ca`:
   ```
   DATABASE_URL=postgres://username:password@host:port/database?sslmode=verify-ca&sslrootcert=/path/to/ca.crt
   ```

2. **Quick workaround**: Use `sslmode=no-verify` to skip certificate validation:
   ```
   DATABASE_URL=postgres://username:password@host:port/database?sslmode=no-verify
   ```
   Note: This is less secure but works for development purposes.

### Automatic SSL Mode Detection

If your database URL contains any of these strings, you should automatically append `?sslmode=no-verify` (if not already present):
- `aivencloud.com`
- `rds.amazonaws.com`
- `azure.com`
- `digitaloceanspaces.com`
- Any URL that includes `ssl` or `cert` keywords

Example code to automatically add `sslmode=no-verify` to problematic connections:

```javascript
function fixSSLConnectionString(dbUrl) {
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
    return dbUrl.includes('?') 
      ? `${dbUrl}&sslmode=no-verify` 
      : `${dbUrl}?sslmode=no-verify`;
  }
  
  return dbUrl;
}

// Usage:
const originalUrl = "postgres://user:pass@pg-xxx.aivencloud.com:12345/mydb";
const fixedUrl = fixSSLConnectionString(originalUrl);
// Result: postgres://user:pass@pg-xxx.aivencloud.com:12345/mydb?sslmode=no-verify
```

This approach helps avoid SSL certificate validation errors when connecting to cloud database services.

## Usage

### Building the project

```bash
# Build the TypeScript code
pnpm build
```

### Running the server

```bash
# Run the server using the .env file or default connection
pnpm start

# Or with a specific database URL
pnpm start "postgres://username:password@host:port/database"
```

The server uses the Model Context Protocol's standard I/O transport, so it's designed to be run as a child process by an MCP client.

## Using with Cursor

Add the following to your Cursor MCP configuration file (located at `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": ["/path/to/your/dist/index.js"],
      "cwd": "/path/to/your"
    }
  }
}
```

### Complete MCP Configuration Example

Here's a complete example of how to configure the PostgreSQL MCP server in your `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": [
        "/Users/username/path/to/postgres/dist/index.js"
      ],
      "cwd": "/Users/username/path/to/postgres",
      "databaseUrl": "postgresql://postgres:postgres@localhost:5432/postgres"
    }
  }
}
```

### MCP Configuration Options

The PostgreSQL MCP server supports the following configuration options in your `mcp.json`:

| Option | Description | Example |
|--------|-------------|---------|
| `command` | The command to run the server (required) | `"node"` |
| `args` | Array of arguments including path to index.js (required) | `["/path/to/dist/index.js"]` |
| `cwd` | Working directory for the server (required) | `"/path/to/postgres"` |
| `databaseUrl` | PostgreSQL connection URL (recommended) | `"postgresql://username:password@host:5432/database"` |

The `databaseUrl` is the preferred way to configure your database connection as it takes precedence over any .env files.

### Database URL Format

The standard PostgreSQL connection URL format is:

```
postgresql://username:password@host:port/database?param1=value1&param2=value2
```

Examples:
- Local development: `postgresql://postgres:postgres@localhost:5432/postgres`
- With SSL (for cloud): `postgresql://user:pass@db.example.com:5432/mydb?sslmode=require`
- With parameters: `postgresql://user:pass@host:5432/db?application_name=mcpclient&connect_timeout=10`

You can also specify the database URL directly in the MCP configuration:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": ["/path/to/your/dist/index.js"],
      "cwd": "/path/to/your",
      "databaseUrl": "postgres://username:password@host:port/database"
    }
  }
}
```

### Easy Setup Script

For easy setup, you can use the included installation script that will configure your Cursor MCP settings automatically:

```bash
./update-dynamic-mcp.sh
```

The script will:
1. Create a backup of your existing MCP configuration
2. Update your Cursor MCP settings to use the PostgreSQL MCP server
3. Preserve any existing database URL configuration
4. Provide instructions on how to configure the database URL

### Database Connection Priority

The server will attempt to connect to PostgreSQL in the following order:
1. Using the command-line argument (if provided)
2. Using the databaseUrl from mcp.json (if specified)
3. Using MCP_CONFIG environment variable
4. Using the DATABASE_URL from .env file
5. Using individual connection parameters from .env (DB_USER, DB_PASSWORD, etc.)
6. Falling back to default localhost connection

## Server Capabilities

This MCP server provides the following capabilities:

### Resources

The server exposes database tables as resources:

- **URI format**: `postgres://host:port/database/table_name/schema`
- **MIME Type**: `application/json`

Listing resources will return all public tables in the database.

### Tools

The server provides the following tools:

#### query

Execute a read-only SQL query against the PostgreSQL database.

- **Name**: `query`
- **Description**: Run a read-only SQL query
- **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "sql": { "type": "string" }
    }
  }
  ```

**Example**:
```json
{
  "sql": "SELECT * FROM users LIMIT 10"
}
```

The tool returns the results as a JSON array.

## Troubleshooting Database Connections

If you encounter database connection issues, try the following steps:

1. **Check your connection string**: Verify the username, password, host, port and database name are correct.

2. **Test basic connectivity**: Run a simple query to test connection:
   ```
   node dist/direct-query.js "" "SELECT 1 as connection_test;"
   ```

3. **SSL Issues**: If you get SSL-related errors:
   - Try using `sslmode=no-verify` for development environments
   - For production, properly configure SSL with appropriate certificates
   - Ensure your network allows connections to the database port

4. **Verify network access**: Ensure your network/firewall allows outbound connections to the database server and port.

5. **Database logs**: Check your database server logs for any connection errors or rejected connection attempts.

### MCP Configuration Troubleshooting

If Claude is having trouble connecting to your database:

1. **Check mcp.json**: Ensure your `~/.cursor/mcp.json` file has the correct `databaseUrl` parameter:
   ```json
   "postgres": {
     "databaseUrl": "postgresql://username:password@host:port/database"
   }
   ```

2. **Restart Cursor**: After making changes to your mcp.json, completely restart Cursor for changes to take effect.

3. **Run in debug mode**: Start the server manually with debug output:
   ```
   node dist/index.js
   ```
   This will show which database URL is being used and any connection errors.

4. **Connection priority**: Remember the server checks for database URLs in this order:
   1. Command-line argument
   2. mcp.json `databaseUrl` property
   3. MCP_CONFIG environment variable
   4. .env file DATABASE_URL
   5. Default localhost connection

5. **Check database visibility**: Ensure the machine running Cursor can access your database:
   ```
   telnet your-database-host 5432
   ```
   
6. **Environment variables**: If you're using environment variables, make sure they're visible to Cursor.

## Security Considerations

- This server executes SQL queries directly, so it should only be used with trusted clients
- All queries are executed in read-only transactions for safety
- Connection credentials are never exposed in resource URIs
- In production, consider implementing:
  - Query validation and sanitization
  - Row-level security policies in PostgreSQL
  - Connection pooling limits

## Implementing an MCP Client

To implement a client for this MCP server, follow the [Model Context Protocol specifications](https://github.com/modelcontextprotocol/mcp).

## MCP Protocol Examples

### Listing Tables

Request:
```json
{
  "jsonrpc": "2.0",
  "method": "resources/list",
  "params": {},
  "id": 1
}
```

Response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "resources": [
      {
        "uri": "postgres://localhost:5432/postgres/users/schema",
        "mimeType": "application/json",
        "name": "\"users\" database schema"
      }
    ]
  },
  "id": 1
}
```

### Reading a Table Schema

Request:
```json
{
  "jsonrpc": "2.0",
  "method": "resources/read",
  "params": {
    "uri": "postgres://localhost:5432/postgres/users/schema"
  },
  "id": 2
}
```

Response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "contents": [
      {
        "uri": "postgres://localhost:5432/postgres/users/schema",
        "mimeType": "application/json",
        "text": "[{\"column_name\":\"id\",\"data_type\":\"integer\"},{\"column_name\":\"name\",\"data_type\":\"character varying\"},{\"column_name\":\"email\",\"data_type\":\"character varying\"}]"
      }
    ]
  },
  "id": 2
}
```

### Executing a Query

Request:
```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "query",
    "arguments": {
      "sql": "SELECT * FROM users LIMIT 2"
    }
  },
  "id": 3
}
```

Response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[{\"id\":1,\"name\":\"John Doe\",\"email\":\"john@example.com\"},{\"id\":2,\"name\":\"Jane Smith\",\"email\":\"jane@example.com\"}]"
      }
    ],
    "isError": false
  },
  "id": 3
}
```

## License

ISC