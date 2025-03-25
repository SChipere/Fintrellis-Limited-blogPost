import Parse from "parse"
import { initializeParse } from "./parse-config"

// Interface for blog post data
export interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

// Interface for creating/updating blog posts
export interface BlogPostData {
  title: string
  content: string
  author: string
}

// Convert Parse object to our BlogPost interface
function parseObjectToBlogPost(parseObject: Parse.Object): BlogPost {
  return {
    id: parseObject.id,
    title: parseObject.get("title") || "",
    content: parseObject.get("content") || "",
    author: parseObject.get("author") || "",
    createdAt: parseObject.get("createdAt")?.toISOString() || new Date().toISOString(),
    updatedAt: parseObject.get("updatedAt")?.toISOString() || new Date().toISOString(),
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Initialize Parse
    initializeParse()

    // Query the BlogPost class
    const BlogPostClass = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPostClass)
    query.descending("createdAt") // Sort by newest first

    const results = await query.find()
    console.log(`Retrieved ${results.length} blog posts from Back4App`)

    // Convert Parse objects to our BlogPost interface
    return results.map(parseObjectToBlogPost)
  } catch (error) {
    console.error("Error fetching blog posts from Back4App:", error)
    throw new Error(`Failed to fetch blog posts: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Get a single blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost> {
  try {
    // Initialize Parse
    initializeParse()

    // Query the BlogPost class
    const BlogPostClass = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPostClass)

    const result = await query.get(id)
    console.log(`Retrieved blog post with ID ${id} from Back4App`)

    // Convert Parse object to our BlogPost interface
    return parseObjectToBlogPost(result)
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id} from Back4App:`, error)
    throw new Error(`Failed to fetch blog post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Create a new blog post
export async function createBlogPost(data: BlogPostData): Promise<BlogPost> {
  try {
    // Initialize Parse
    initializeParse()

    // Create a new BlogPost object
    const BlogPostClass = Parse.Object.extend("BlogPost")
    const blogPost = new BlogPostClass()

    // Set the blog post data
    blogPost.set("title", data.title)
    blogPost.set("content", data.content)
    blogPost.set("author", data.author)

    // Save the blog post
    const result = await blogPost.save()
    console.log(`Created new blog post with ID ${result.id} in Back4App`)

    // Convert Parse object to our BlogPost interface
    return parseObjectToBlogPost(result)
  } catch (error) {
    console.error("Error creating blog post in Back4App:", error)
    throw new Error(`Failed to create blog post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Update an existing blog post
export async function updateBlogPost(id: string, data: BlogPostData): Promise<BlogPost> {
  try {
    // Initialize Parse
    initializeParse()

    // Query the BlogPost class
    const BlogPostClass = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPostClass)

    // Get the blog post
    const blogPost = await query.get(id)

    // Update the blog post data
    blogPost.set("title", data.title)
    blogPost.set("content", data.content)
    blogPost.set("author", data.author)

    // Save the updated blog post
    const result = await blogPost.save()
    console.log(`Updated blog post with ID ${id} in Back4App`)

    // Convert Parse object to our BlogPost interface
    return parseObjectToBlogPost(result)
  } catch (error) {
    console.error(`Error updating blog post with ID ${id} in Back4App:`, error)
    throw new Error(`Failed to update blog post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    // Initialize Parse
    initializeParse()

    // Query the BlogPost class
    const BlogPostClass = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPostClass)

    // Get the blog post
    const blogPost = await query.get(id)

    // Delete the blog post
    await blogPost.destroy()
    console.log(`Deleted blog post with ID ${id} from Back4App`)

    return true
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id} from Back4App:`, error)
    throw new Error(`Failed to delete blog post: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

