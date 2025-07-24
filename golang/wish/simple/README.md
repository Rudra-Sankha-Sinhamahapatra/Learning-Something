# Simple SSH Server

This is a minimal SSH server implementation using [Charm's Wish](https://github.com/charmbracelet/wish) library. The server demonstrates basic SSH functionality with middleware for logging and custom message handling.

## Features

- Custom SSH server running on localhost
- Greeting message for connected users
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

2. Run the server:
   ```bash
   go run main.go
   ```
   The server will start on `localhost:23234`

## Connecting to the Server

Use any SSH client to connect to the server. For example, using OpenSSH:

```bash
ssh localhost -p 23234
```

You should see:
1. A "Hello, world!" message when you connect
2. Server logs showing the connection details

## Project Structure

- `main.go` - Server implementation with Wish middleware
- `.ssh/` - Directory containing SSH host keys
- `go.mod` & `go.sum` - Go module files with dependencies

## Configuration

The server is configured with these default settings:
- Host: localhost
- Port: 23234
- Host Key Path: .ssh/id_ed25519

## Dependencies

- github.com/charmbracelet/wish - SSH server framework
- github.com/charmbracelet/log - Logging utility
- github.com/charmbracelet/ssh - SSH server implementation 