# Next.js Infinite Scrolling with TanStack Query

This project demonstrates infinite scrolling implementation using Next.js and TanStack Query (formerly React Query).

## Features

- Infinite scrolling using Intersection Observer API
- Data fetching with TanStack Query
- Loading states and error handling
- Efficient pagination with cursor-based approach

## Implementation Details

### TanStack Query Setup

```typescript
const {
  data,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
} = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({pageParam = 0}) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if(lastPage.length < 10) return undefined
      return allPages.length
    }
})
```

### Intersection Observer Implementation

```typescript
const observerRef = useRef<IntersectionObserver|null>(null);
const loadMoreRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if(!loadMoreRef.current) return;

  observerRef.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    },
    {threshold: 0.5}
  )

  observerRef.current.observe(loadMoreRef.current);

  return () => {
    if(observerRef.current) {
      observerRef.current.disconnect()
    }
  }
}, [hasNextPage, isFetching, fetchNextPage]);
```

## How It Works

1. **Infinite Query Setup**:
   - Uses `useInfiniteQuery` from TanStack Query
   - Manages pagination state automatically
   - Handles loading and error states

2. **Intersection Observer**:
   - `loadMoreRef`: References the sentinel element at the bottom of the list
   - `observerRef`: Watches for when the sentinel becomes visible
   - Automatically triggers next page load when sentinel is visible

3. **Loading States**:
   - Shows loading spinner for initial load
   - Displays "Next page..." while fetching more data
   - Indicates when no more data is available

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

- `PostPage.tsx`: Main component implementing infinite scroll
- `FetchPosts.ts`: API fetching logic
- `Spinner.tsx`: Loading indicator component
- `ErrorPage.tsx`: Error handling component

## Dependencies

- Next.js
- TanStack Query v5
- TypeScript
- Tailwind CSS

## Learn More

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Next.js Documentation](https://nextjs.org/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
