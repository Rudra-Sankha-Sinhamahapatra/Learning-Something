"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../lib/FetchPosts"
import SpinnerCustomStyles from "./Spinner"
import ErrorSection from "./ErrorPage"


export const PostPage = () => {
    const {data,isLoading,error} = useQuery({
        queryKey:['posts'],
        queryFn: fetchPosts,
    }) 

    if(isLoading) return <SpinnerCustomStyles/>

    if(error) return <ErrorSection/>

    return (
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl my-4">Posts</h1>
        <ul className="space-y-4 w-[75%] max-w-3xl mx-auto">
          {data?.slice(0,10).map(post=>(
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