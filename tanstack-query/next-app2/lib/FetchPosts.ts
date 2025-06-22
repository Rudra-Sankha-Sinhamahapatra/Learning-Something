import axios from "axios"
import { Post } from "../types/post"

export const fetchPosts = async(page:number):Promise<Post[]> => {
 const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page + 1}&_limit=10`);
 return res.data;
}