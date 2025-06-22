"use client"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../lib/FetchPosts"
import SpinnerCustomStyles from "./Spinner"
import ErrorSection from "./ErrorPage"
import React, { useEffect, useRef } from "react"

export const PostPage = () => {
  const observerRef = useRef<IntersectionObserver|null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const {
      data,
      isLoading,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey:['posts'],
        queryFn:({pageParam = 0}) => fetchPosts(pageParam),
        initialPageParam:0,
        getNextPageParam: (lastPage,allPages) => {
          if(lastPage.length <10) return undefined

          return allPages.length
        }
    }) 

    useEffect(() => {
      if(!loadMoreRef.current) return;

      observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage()
        }
      },
      {threshold:0.5}
      )

      observerRef.current.observe(loadMoreRef.current);

      return () => {
        if(observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    },[hasNextPage,isFetching,fetchNextPage]);

    if(isLoading) return <SpinnerCustomStyles/>

    if(error) return <ErrorSection/>

    return (
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl my-4">Posts</h1>
        {data?.pages.map((group,i) => (
        <React.Fragment key={i}>
        <ul className="space-y-4 w-[75%] max-w-3xl mx-auto">
          {group.map(post=>(
            <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-gray-600">UserId: {post.userId}</div>
              <h2 className="text-md mt-2">Title: <span className="font-semibold">{post.title}</span></h2>
              <p className="mt-2 text-gray-700">Body: {post.body}</p>
            </li>
          ))}
        </ul>
         </React.Fragment>
             ))}

             <div ref={loadMoreRef} className="py-4">
             {
              isFetchingNextPage ? (
                <SpinnerCustomStyles/>
              ) : hasNextPage? (
                <div className="text-gray-500">
                  Next page...
                </div>
              ) : (
                <div className="text-gray-500">
                  No more posts to load
                </div>
              )
             }
             </div>
      </div>
    )
}