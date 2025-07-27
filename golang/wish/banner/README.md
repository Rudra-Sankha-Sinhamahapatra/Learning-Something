# SSH Banner Server

A simple SSH server built with [Charm's Wish](https://github.com/charmbracelet/wish) that displays a custom ASCII art banner when users connect.

## Features

- Custom ASCII art banner display
- Simple password authentication
- Connection logging
- Connection duration tracking
- Graceful shutdown handling

## Prerequisites

- Go 1.16 or later
- SSH client

## Setup

1. Clone the repository
2. Generate SSH host keys:
   ```bash
   mkdir -p .ssh
   ssh-keygen -t ed25519 -f .ssh/id_ed25519 -N ""
   ```

## Running the Server

1. Start the server:
   ```bash
   go run main.go
   ```
   The server will start on `localhost:23234`

2. Connect using SSH:
   ```bash
   ssh -p 23234 localhost
   ```
   When prompted for password, use: `asd123`

## Project Structure

- `main.go` - Main server implementation
- `banner.txt` - ASCII art banner template
- `.ssh/` - Directory containing SSH host keys
- `go.mod` & `go.sum` - Go module files

## Implementation Details

The server uses several Charm Wish middleware components:
- Banner handler for displaying welcome message
- Password authentication
- Connection logging
- Elapsed time tracking

## Security Note

This is a demonstration project. The password is hardcoded and the server accepts connections on localhost only. Do not use this configuration in production environments.

## License

This project uses the MIT License. 