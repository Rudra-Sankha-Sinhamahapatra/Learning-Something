#!/bin/bash

# Get current directory
CURRENT_DIR=$(pwd)

# Create a backup of the mcp.json file
MCP_CONFIG_PATH="$HOME/.cursor/mcp.json"
if [ -f "$MCP_CONFIG_PATH" ]; then
  cp "$MCP_CONFIG_PATH" "$MCP_CONFIG_PATH.backup"
  echo "Created backup of MCP config at $MCP_CONFIG_PATH.backup"
else
  echo "Error: MCP config file not found at $MCP_CONFIG_PATH"
  exit 1
fi

# Set the server file
SERVER_FILE="index.js"
echo "Using PostgreSQL MCP server with enhanced connection features"

# Read the current configuration
if command -v jq &> /dev/null; then
  echo "Using jq to update only the postgres section..."
  
  # Extract the current databaseUrl if it exists
  CURRENT_DB_URL=$(jq -r '.mcpServers.postgres.databaseUrl // empty' "$MCP_CONFIG_PATH")
  
  # Create the updated configuration
  if [ -n "$CURRENT_DB_URL" ]; then
    echo "Preserving existing databaseUrl: ${CURRENT_DB_URL//:*@/:***@}"
    
    # Create a temporary file with the modified content, preserving databaseUrl
    jq --arg current_dir "$CURRENT_DIR" --arg server_file "$SERVER_FILE" --arg db_url "$CURRENT_DB_URL" '.mcpServers.postgres = {
      "command": "node",
      "args": [$current_dir + "/dist/" + $server_file],
      "cwd": $current_dir,
      "databaseUrl": $db_url
    }' "$MCP_CONFIG_PATH" > "$MCP_CONFIG_PATH.tmp"
  else
    # Create a temporary file with the modified content without databaseUrl
    jq --arg current_dir "$CURRENT_DIR" --arg server_file "$SERVER_FILE" '.mcpServers.postgres = {
      "command": "node",
      "args": [$current_dir + "/dist/" + $server_file],
      "cwd": $current_dir
    }' "$MCP_CONFIG_PATH" > "$MCP_CONFIG_PATH.tmp"
  fi
  
  if [ $? -eq 0 ]; then
    mv "$MCP_CONFIG_PATH.tmp" "$MCP_CONFIG_PATH"
    echo "Updated postgres configuration to use $SERVER_FILE"
    echo "This server will automatically read the .env file from the current working directory"
  else
    echo "Error updating with jq"
    rm -f "$MCP_CONFIG_PATH.tmp"
  fi
else
  echo "jq is not installed. Please manually edit $MCP_CONFIG_PATH."
  echo "You need to configure your MCP config at $MCP_CONFIG_PATH:"
  echo "Example:"
  echo '  "postgres": {'
  echo '    "command": "node",'
  echo '    "args": ["'$CURRENT_DIR'/dist/'$SERVER_FILE'"],'
  echo '    "cwd": "'$CURRENT_DIR'"'
  echo '  }'
fi

echo ""
echo "DATABASE CONNECTION INFORMATION:"
echo "--------------------------------"
echo "You can now also set a custom database URL directly in your mcp.json file."
echo "The server will attempt to connect to PostgreSQL in the following order:"
echo "1. Using the command-line argument (if provided)"
echo "2. Using the databaseUrl from mcp.json (if specified)"
echo "3. Using MCP_CONFIG environment variable"
echo "4. Using the DATABASE_URL from .env file"
echo "5. Using individual connection parameters from .env (DB_USER, DB_PASSWORD, etc.)"
echo "6. Falling back to default localhost connection"
echo ""
echo "To specify a custom database URL in your mcp.json file, add the 'databaseUrl' property:"
echo '  "postgres": {'
echo '    "command": "node",'
echo '    "args": ["'$CURRENT_DIR'/dist/'$SERVER_FILE'"],'
echo '    "cwd": "'$CURRENT_DIR'",'
echo '    "databaseUrl": "postgresql://username:password@localhost:5432/database"'
echo '  }'
echo ""
echo "To restore your original configuration, run:"
echo "cp $MCP_CONFIG_PATH.backup $MCP_CONFIG_PATH"
echo ""
echo "Please restart Cursor completely for changes to take effect" 