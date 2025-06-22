# Next.js with TanStack Query Basic Implementation

This project demonstrates basic data fetching using Next.js and TanStack Query (formerly React Query).

## Features

- Simple data fetching with TanStack Query
- Loading states and error handling
- Centralized state management
- Automatic background updates
- Caching out of the box

## Implementation Details

### TanStack Query Setup

```typescript
const {data, isLoading, error} = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
}) 
```

### Component Implementation

```typescript
export const PostPage = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    }) 

    if(isLoading) return <SpinnerCustomStyles/>
    if(error) return <ErrorSection/>

    return (
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl my-4">Posts</h1>
        <ul className="space-y-4 w-[75%] max-w-3xl mx-auto">
          {data?.slice(0,10).map(post => (
            <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-gray-600">UserId: {post.userId}</div>
              <h2 className="text-md mt-2">Title: <span className="font-semibold">{post.title}</span></h2>
              <p className="mt-2 text-gray-700">Body: {post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    )
}
```

## How It Works

1. **Query Setup**:
   - Uses `useQuery` hook from TanStack Query
   - Automatically manages data fetching states
   - Provides loading and error states out of the box

2. **State Management**:
   - `data`: Contains the fetched data
   - `isLoading`: True during initial data fetch
   - `error`: Contains any error that occurred during fetching

3. **Features**:
   - Automatic caching
   - Background data updates
   - Error handling
   - Loading states

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Components

- `PostPage.tsx`: Main component implementing TanStack Query
- `FetchPosts.ts`: API fetching logic
- `Spinner.tsx`: Loading indicator component
- `ErrorPage.tsx`: Error handling component

## Dependencies

- Next.js
- TanStack Query v5
- TypeScript
- Tailwind CSS

## Advantages Over Traditional Fetching

1. **Automatic Caching**:
   - Data is cached by queryKey
   - Reduces unnecessary API calls
   - Improves user experience

2. **Built-in States**:
   - Loading states
   - Error states
   - Success states

3. **Background Updates**:
   - Automatic stale data handling
   - Configurable refetch intervals
   - Window focus refetching

## Learn More

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
