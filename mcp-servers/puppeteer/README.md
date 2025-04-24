
# Puppeteer MCP Server (SSE Version)

A Model Context Protocol server that provides browser automation capabilities using Puppeteer. This server enables LLMs to interact with web pages, take screenshots, and execute JavaScript in a real browser environment, all using Server-Sent Events (SSE) for communication.

## Features

- Browser automation via Puppeteer
- Server-Sent Events (SSE) for real-time communication
- Screenshot capabilities (full page or specific elements)
- Console log monitoring
- JavaScript execution in browser context
- Web interaction (navigation, clicking, form filling)
- Customizable Puppeteer launch options

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Setup

1. Clone the repository or create a new directory for your project:

```bash
mkdir puppeteer-mcp-server
cd puppeteer-mcp-server
```

2. Create a package.json file:

```json
{
  "name": "puppeteer-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for browser automation using Puppeteer",
  "license": "MIT",
  "type": "module",
  "bin": {
    "mcp-server-puppeteer": "dist/index.js"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc && shx chmod +x dist/*.js",
    "prepare": "npm run build",
    "watch": "tsc --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "1.0.1",
    "express": "^4.18.2",
    "puppeteer": "^23.4.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "shx": "^0.3.4",
    "typescript": "^5.6.2"
  }
}
```

3. Create a tsconfig.json file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

4. Install dependencies:

```bash
npm install
```

5. Create an index.ts file with the server implementation (copy the full code from the SSE-based Puppeteer server implementation).

6. Build the project:

```bash
npm run build
```

## Running the Server

Run the built server:

```bash
node dist/index.js
```

By default, the server will start on port 3000. You can customize the port by setting the PORT environment variable:

```bash
PORT=4000 node dist/index.js
```

You should see output similar to:
```
HTTP server listening on port 3000
SSE endpoint available at http://localhost:3000/sse
Message endpoint available at http://localhost:3000/messages
Puppeteer tools are available and ready to use
```

## Configuration for Cursor

To use the Puppeteer MCP server with Cursor, add the following to your `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "puppeteer": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

Alternatively, if you want Cursor to start the server for you:

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "node",
      "args": [
        "/path/to/your/puppeteer-mcp-server/dist/index.js"
      ],
      "cwd": "/path/to/your/puppeteer-mcp-server"
    }
  }
}
```

Restart Cursor to apply the changes.

## Available Tools

The server provides the following tools:

1. **puppeteer_navigate**
   - Navigate to any URL in the browser
   - Parameters:
     - `url` (string, required): URL to navigate to
     - `launchOptions` (object, optional): PuppeteerJS LaunchOptions
     - `allowDangerous` (boolean, optional): Allow dangerous LaunchOptions

2. **puppeteer_screenshot**
   - Capture screenshots of the entire page or specific elements
   - Parameters:
     - `name` (string, required): Name for the screenshot
     - `selector` (string, optional): CSS selector for element to screenshot
     - `width` (number, optional): Screenshot width (default: 800)
     - `height` (number, optional): Screenshot height (default: 600)

3. **puppeteer_click**
   - Click elements on the page
   - Parameter: `selector` (string): CSS selector for element to click

4. **puppeteer_fill**
   - Fill out input fields
   - Parameters:
     - `selector` (string): CSS selector for input field
     - `value` (string): Value to fill

5. **puppeteer_select**
   - Select an option in a dropdown
   - Parameters:
     - `selector` (string): CSS selector for select element
     - `value` (string): Value to select

6. **puppeteer_hover**
   - Hover over elements on the page
   - Parameter: `selector` (string): CSS selector for element to hover

7. **puppeteer_evaluate**
   - Execute JavaScript in the browser console
   - Parameter: `script` (string): JavaScript code to execute

## Resources

The server provides access to:

1. **Console Logs** (`console://logs`)
   - Browser console output in text format

2. **Screenshots** (`screenshot://<name>`)
   - PNG images of captured screenshots
   - Accessible via the screenshot name specified during capture

## Launch Options

You can customize Puppeteer's browser behavior by:

1. **Environment Variable**: Set `PUPPETEER_LAUNCH_OPTIONS` with a JSON-encoded string:
   ```bash
   PUPPETEER_LAUNCH_OPTIONS='{"headless":false,"args":["--window-size=1280,720"]}' node dist/index.js
   ```

2. **Tool Call Arguments**: Pass `launchOptions` to the `puppeteer_navigate` tool:
   ```json
   {
     "url": "https://example.com",
     "launchOptions": {
       "headless": false,
       "defaultViewport": { "width": 1280, "height": 720 }
     }
   }
   ```

## License

This project is licensed under the MIT License.
