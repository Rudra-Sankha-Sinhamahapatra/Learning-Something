# Kubernetes Next.js App with Turborepo

This is a Next.js application deployed on Kubernetes with sealed secrets for environment variables.

## Quick Start

To run this application locally with Kubernetes:

```sh
# 1. Build and run the Docker container
docker build -t nextjs-app:latest -f docker/Dockerfile.web .

# 2. Apply Kubernetes manifests
kubectl apply -f k8s/nextjs-env-sealed.yaml
kubectl apply -f k8s/web-deployment.yaml

# 3. Access from other devices (recommended for development)
kubectl port-forward --address 0.0.0.0 svc/nextjs-service 3000:3000

# Then access from any device: http://YOUR_MACHINE_IP:3000
```

## Kubernetes Setup Details

### Environment Variables (Sealed Secrets)

This app uses Kubernetes Sealed Secrets for secure environment variable management:

- `nextjs-env.yaml` - Raw secrets (DO NOT commit to Git)
- `k8s/nextjs-env-sealed.yaml` - Encrypted secrets (safe to commit)

#### First Time Setup:

1. **Install sealed-secrets controller**:
   ```sh
   kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/controller.yaml
   ```

2. **Install kubeseal CLI** (macOS):
   ```sh
   brew install kubeseal
   ```

3. **Create your raw secrets file** (`nextjs-env.yaml`):
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: nextjs-env
   type: Opaque
   data:
     DATABASE_URL: <base64-encoded-database-url>
     NEXT_PUBLIC_API_URL: <base64-encoded-api-url>
   ```

4. **Generate base64 values**:
   ```sh
   echo -n "postgres://user:pass@db:5432/mydb" | base64
   echo -n "https://api.local.dev" | base64
   ```

5. **Create sealed secret**:
   ```sh
   kubeseal -f nextjs-env.yaml -w k8s/nextjs-env-sealed.yaml
   ```

#### To update environment variables:
1. Edit your raw secrets in `nextjs-env.yaml`
2. Create sealed secret: `kubeseal -f nextjs-env.yaml -w k8s/nextjs-env-sealed.yaml`
3. Apply: `kubectl apply -f k8s/nextjs-env-sealed.yaml`

### Docker Build

```sh
# Build the Docker image
docker build -t nextjs-app:latest -f docker/Dockerfile.web .

# Check image
docker images | grep nextjs-app
```

### Kubernetes Deployment

```sh
# Apply all manifests
kubectl apply -f k8s/

# Check status
kubectl get pods,svc,secrets

# View logs
kubectl logs -l app=nextjs-app

# Delete everything
kubectl delete -f k8s/
```

### Access Methods

1. **Development (External Access)**:
   ```sh
   kubectl port-forward --address 0.0.0.0 svc/nextjs-service 3000:3000
   # Access: http://YOUR_MACHINE_IP:3000
   ```

2. **Local Only**:
   ```sh
   kubectl port-forward svc/nextjs-service 3000:3000
   # Access: http://localhost:3000
   ```

3. **Production**: Use Ingress or LoadBalancer service

### Troubleshooting

- **Pod not starting**: `kubectl describe pod <pod-name>`
- **Service issues**: `kubectl describe svc nextjs-service`
- **Secrets issues**: `kubectl get secrets` and check sealed-secrets controller

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
