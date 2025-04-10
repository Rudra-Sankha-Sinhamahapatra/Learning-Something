#!/bin/bash

# Kill any existing Cursor processes
killall cursor 2>/dev/null
sleep 1
killall -9 cursor 2>/dev/null

# Kill any existing Node processes that might be running MCP servers
pkill -f "node.*index.js" 2>/dev/null
sleep 1
pkill -9 -f "node.*index.js" 2>/dev/null

# Get current directory
CURRENT_DIR=$(pwd)

# Read the DATABASE_URL from the .env file
if [ -f "$CURRENT_DIR/.env" ]; then
  DATABASE_URL=$(grep DATABASE_URL "$CURRENT_DIR/.env" | cut -d'=' -f2-)
  echo "Found DATABASE_URL in .env: ${DATABASE_URL//:*@/:***@}"
else
  echo "Error: .env file not found in $CURRENT_DIR"
  exit 1
fi

# Create a backup of the mcp.json file
MCP_CONFIG_PATH="$HOME/.cursor/mcp.json"
if [ -f "$MCP_CONFIG_PATH" ]; then
  cp "$MCP_CONFIG_PATH" "$MCP_CONFIG_PATH.backup"
  echo "Created backup of MCP config at $MCP_CONFIG_PATH.backup"
else
  echo "Error: MCP config file not found at $MCP_CONFIG_PATH"
  exit 1
fi

# Update the MCP config to explicitly use the .env file's DATABASE_URL
cat > "$MCP_CONFIG_PATH" << EOL
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": ["$CURRENT_DIR/dist/index.js"],
      "cwd": "$CURRENT_DIR",
      "env": {
        "DATABASE_URL": "$DATABASE_URL",
        "MCP_RELOADED": "yes",
        "FORCE_COLOR": "1"
      }
    }
  }
}
EOL

echo "Updated MCP config at $MCP_CONFIG_PATH with current DATABASE_URL"
echo "Please restart Cursor manually for changes to take effect"
echo "If you want to revert changes, restore from $MCP_CONFIG_PATH.backup" 