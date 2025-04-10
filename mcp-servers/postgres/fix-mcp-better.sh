#!/bin/bash

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

# MCP config path
MCP_CONFIG_PATH="$HOME/.cursor/mcp.json"
if [ ! -f "$MCP_CONFIG_PATH" ]; then
  echo "Error: MCP config file not found at $MCP_CONFIG_PATH"
  exit 1
fi

# Create a backup of the current mcp.json
cp "$MCP_CONFIG_PATH" "$MCP_CONFIG_PATH.backup"
echo "Created backup of MCP config at $MCP_CONFIG_PATH.backup"

# Use jq to update only the postgres section if available
if command -v jq &> /dev/null; then
  echo "Using jq to update only the postgres section..."
  
  # Create a temporary file with the modified content
  jq --arg db_url "$DATABASE_URL" --arg current_dir "$CURRENT_DIR" '.mcpServers.postgres = {
    "command": "node",
    "args": [$current_dir + "/dist/index.js"],
    "cwd": $current_dir,
    "env": {
      "DATABASE_URL": $db_url,
      "MCP_RELOADED": "yes",
      "FORCE_COLOR": "1"
    }
  }' "$MCP_CONFIG_PATH" > "$MCP_CONFIG_PATH.tmp"
  
  # Check if the jq command succeeded
  if [ $? -eq 0 ]; then
    mv "$MCP_CONFIG_PATH.tmp" "$MCP_CONFIG_PATH"
    echo "Updated postgres configuration while preserving other MCP servers"
  else
    echo "Error updating with jq, falling back to backup plan"
    rm "$MCP_CONFIG_PATH.tmp"
    # Fall back to the backup plan (manual editing)
    echo "Please manually edit $MCP_CONFIG_PATH to update just the postgres section"
  fi
else
  echo "jq not found. Please install jq or manually edit your MCP config."
  echo "You need to modify only the 'postgres' section in $MCP_CONFIG_PATH"
  echo "Add the DATABASE_URL to the 'env' section while preserving other servers"
fi

echo ""
echo "To restore your original configuration, run:"
echo "cp $MCP_CONFIG_PATH.backup $MCP_CONFIG_PATH"
echo ""
echo "Please restart Cursor for changes to take effect" 