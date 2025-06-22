import axios from "axios"
import { Post } from "../types/post"

export const fetchPosts = async():Promise<Post[]> => {
 const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
 return res.data;
}