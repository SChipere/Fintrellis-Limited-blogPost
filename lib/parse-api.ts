import Parse from "parse"
import { ensureBlogPostClass } from "./ensure-schema"

// Initialize Parse on the server side
if (typeof window === "undefined") {
  // Make sure Parse is only initialized once
  if (!Parse.applicationId) {
    Parse.initialize("rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X")
    Parse.serverURL = "https://parseapi.back4app.com/"
    console.log("Parse initialized in parse-api")
  }
}

// Convert Parse object to a plain JavaScript object
export const parseObjectToPost = (parseObject: Parse.Object) => {
  return {
    id: parseObject.id,
    title: parseObject.get("title"),
    content: parseObject.get("content"),
    author: parseObject.get("author"),
    createdAt: parseObject.get("createdAt").toISOString(),
    updatedAt: parseObject.get("updatedAt").toISOString(),
  }
}

// Get all posts from Parse
export async function getParsePostsServer() {
  try {
    // Try to ensure the BlogPost class exists, but continue even if it fails
    await ensureBlogPostClass().catch((err) => {
      console.warn("Warning: Could not ensure BlogPost class exists:", err)
    })

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)
    query.descending("createdAt")

    const results = await query.find()
    return results.map(parseObjectToPost)
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Get a single post by ID from Parse
export async function getParsePostServer(id: string) {
  try {
    // Try to ensure the BlogPost class exists, but continue even if it fails
    await ensureBlogPostClass().catch((err) => {
      console.warn("Warning: Could not ensure BlogPost class exists:", err)
    })

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)

    const post = await query.get(id)
    return parseObjectToPost(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    throw new Error(`Failed to fetch post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Create a new post in Parse
export async function createParsePostServer(data: { title: string; content: string; author: string }) {
  try {
    console.log("Creating post with data:", data)

    // Ensure Parse is initialized
    if (!Parse.applicationId) {
      Parse.initialize("rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X")
      Parse.serverURL = "https://parseapi.back4app.com/"
      console.log("Parse initialized during post creation")
    }

    // Try to ensure the BlogPost class exists, but continue even if it fails
    await ensureBlogPostClass().catch((err) => {
      console.warn("Warning: Could not ensure BlogPost class exists:", err)
    })

    const BlogPost = Parse.Object.extend("BlogPost")
    const post = new BlogPost()

    post.set("title", data.title)
    post.set("content", data.content)
    post.set("author", data.author)

    const result = await post.save()
    console.log("Post created successfully:", result.id)
    return parseObjectToPost(result)
  } catch (error) {
    console.error("Error creating post:", error)
    throw new Error(`Failed to create post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Update an existing post in Parse
export async function updateParsePostServer(id: string, data: { title: string; content: string; author: string }) {
  try {
    // Try to ensure the BlogPost class exists, but continue even if it fails
    await ensureBlogPostClass().catch((err) => {
      console.warn("Warning: Could not ensure BlogPost class exists:", err)
    })

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)

    const post = await query.get(id)

    post.set("title", data.title)
    post.set("content", data.content)
    post.set("author", data.author)

    const result = await post.save()
    return parseObjectToPost(result)
  } catch (error) {
    console.error("Error updating post:", error)
    throw new Error(`Failed to update post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Delete a post in Parse
export async function deleteParsePostServer(id: string) {
  try {
    // Try to ensure the BlogPost class exists, but continue even if it fails
    await ensureBlogPostClass().catch((err) => {
      console.warn("Warning: Could not ensure BlogPost class exists:", err)
    })

    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)

    const post = await query.get(id)
    await post.destroy()

    return { success: true }
  } catch (error) {
    console.error("Error deleting post:", error)
    throw new Error(`Failed to delete post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

