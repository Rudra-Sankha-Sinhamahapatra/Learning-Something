# app1

gRPC server application with TypeScript support.

## Setup

1. Install dependencies:
```bash
bun install
```

2. Create generated types folder:
```bash
mkdir generated
```

3. Generate TypeScript types from proto files:
```bash
npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=generated \
  --js_out=import_style=commonjs,binary:generated \
  --grpc_out=grpc_js:generated \
  --proto_path=./proto \
  proto/user.proto
```

## Run

Start the server:
```bash
bun run dev:server
```

Start the client (in another terminal):
```bash
bun run dev:client
```

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
