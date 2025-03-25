import Parse from "parse"
import { initializeParse } from "./parse-config"
import * as localStorage from "./local-storage"

// Flag to track if we should use local storage fallback
let useLocalStorageFallback = false

// Function to convert Parse object to a plain JavaScript object
const parseObjectToPost = (parseObject: Parse.Object) => {
  return {
    id: parseObject.id,
    title: parseObject.get("title"),
    content: parseObject.get("content"),
    author: parseObject.get("author"),
    createdAt: parseObject.get("createdAt").toISOString(),
    updatedAt: parseObject.get("updatedAt").toISOString(),
  }
}

// Get all posts
export async function getPosts() {
  // If we've already determined to use local storage, don't try Parse again
  if (useLocalStorageFallback) {
    console.log("Using local storage fallback for getPosts")
    return localStorage.getAllPosts()
  }

  try {
    // Try to use Parse
    initializeParse()

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)
    query.descending("createdAt")

    const results = await query.find()
    return results.map(parseObjectToPost)
  } catch (error) {
    console.error("Error fetching posts from Parse, falling back to local storage:", error)
    useLocalStorageFallback = true
    return localStorage.getAllPosts()
  }
}

// Get a single post by ID
export async function getPost(id: string) {
  // If we've already determined to use local storage, don't try Parse again
  if (useLocalStorageFallback) {
    console.log("Using local storage fallback for getPost")
    const post = localStorage.getPostById(id)
    if (!post) throw new Error("Post not found")
    return post
  }

  try {
    // Try to use Parse
    initializeParse()

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)

    const post = await query.get(id)
    return parseObjectToPost(post)
  } catch (error) {
    console.error("Error fetching post from Parse, falling back to local storage:", error)
    useLocalStorageFallback = true

    const post = localStorage.getPostById(id)
    if (!post) throw new Error("Post not found")
    return post
  }
}

// Create a new post
export async function createPost(data: { title: string; content: string; author: string }) {
  // If we've already determined to use local storage, don't try Parse again
  if (useLocalStorageFallback) {
    console.log("Using local storage fallback for createPost")
    return localStorage.addPost(data)
  }

  try {
    // Try to use Parse
    initializeParse()

    const BlogPost = Parse.Object.extend("BlogPost")
    const post = new BlogPost()

    post.set("title", data.title)
    post.set("content", data.content)
    post.set("author", data.author)

    const result = await post.save()
    return parseObjectToPost(result)
  } catch (error) {
    console.error("Error creating post in Parse, falling back to local storage:", error)
    useLocalStorageFallback = true
    return localStorage.addPost(data)
  }
}

// Update an existing post
export async function updatePost(id: string, data: { title: string; content: string; author: string }) {
  // If we've already determined to use local storage, don't try Parse again
  if (useLocalStorageFallback) {
    console.log("Using local storage fallback for updatePost")
    const post = localStorage.updatePostById(id, data)
    if (!post) throw new Error("Post not found")
    return post
  }

  try {
    // Try to use Parse
    initializeParse()

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)

    const post = await query.get(id)

    post.set("title", data.title)
    post.set("content", data.content)
    post.set("author", data.author)

    const result = await post.save()
    return parseObjectToPost(result)
  } catch (error) {
    console.error("Error updating post in Parse, falling back to local storage:", error)
    useLocalStorageFallback = true

    const post = localStorage.updatePostById(id, data)
    if (!post) throw new Error("Post not found")
    return post
  }
}

// Delete a post
export async function deletePost(id: string) {
  // If we've already determined to use local storage, don't try Parse again
  if (useLocalStorageFallback) {
    console.log("Using local storage fallback for deletePost")
    const success = localStorage.deletePostById(id)
    if (!success) throw new Error("Post not found")
    return { success: true }
  }

  try {
    // Try to use Parse
    initializeParse()

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)

    const post = await query.get(id)
    await post.destroy()

    return { success: true }
  } catch (error) {
    console.error("Error deleting post in Parse, falling back to local storage:", error)
    useLocalStorageFallback = true

    const success = localStorage.deletePostById(id)
    if (!success) throw new Error("Post not found")
    return { success: true }
  }
}

