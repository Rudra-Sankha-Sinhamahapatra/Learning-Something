# Graceful SSH Server

This is an SSH server implementation using [Charm's Wish](https://github.com/charmbracelet/wish) library that demonstrates graceful shutdown handling. The server sends a "Hello, world!" message when users connect and properly handles shutdown signals.

## Features

- Custom SSH server running on localhost
- Graceful shutdown with signal handling (SIGINT, SIGTERM)
- 30-second shutdown timeout for existing connections
- Connection logging middleware
- ED25519 key-based authentication

## Prerequisites

- Go 1.16 or later
- OpenSSH client (for connecting to the server)

## Setup

1. Generate SSH host keys (if not already present):
   ```bash
   mkdir -p .ssh
   ssh-keygen -t ed25519 -f .ssh/id_ed25519 -N ""
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Run the server:
   ```bash
   go run main.go
   ```
   The server will start on `localhost:23234`

## Connecting to the Server

Use any SSH client to connect to the server. For example, using OpenSSH:

```bash
ssh localhost -p 23234
```

If you see a host key verification error like this:
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

You have two options:

1. (Recommended) Remove the old host key:
   ```bash
   ssh-keygen -R "[localhost]:23234"
   ```
   Then try connecting again. You'll be prompted to accept the new host key:
   ```bash
   The authenticity of host '[localhost]:23234' can't be established.
   ED25519 key fingerprint is SHA256:XXXXX
   Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
   ```

2. (Development Only) Bypass host key checking:
   ```bash
   ssh -o StrictHostKeyChecking=no -p 23234 localhost
   ```
   ⚠️ **Security Warning**: This option skips security verification and should ONLY be used for local development. Never use this option in production or when connecting to remote servers, as it makes you vulnerable to man-in-the-middle attacks.

## What to Expect

1. When you connect:
   - You'll see a "Hello, world!" message
   - The connection will close automatically
   - Server logs will show the connection details

2. When shutting down the server (Ctrl+C):
   - Server will stop accepting new connections
   - Existing connections have 30 seconds to complete
   - Clean shutdown after timeout or when all connections close

## Project Structure

- `main.go` - Server implementation with graceful shutdown
- `.ssh/` - Directory containing SSH host keys
- `go.mod` & `go.sum` - Go module files with dependencies

## Configuration

The server uses these default settings:
- Host: localhost
- Port: 23234
- Host Key Path: .ssh/id_ed25519
- Shutdown Timeout: 30 seconds

## Dependencies

- github.com/charmbracelet/wish - SSH server framework
- github.com/charmbracelet/log - Logging utility
- github.com/charmbracelet/ssh - SSH server implementation

## Contributing

Feel free to experiment with:
- Adding custom middleware
- Implementing interactive sessions
- Extending shutdown behavior
- Adding more signal handlers
