import { NextResponse } from "next/server"
import { getAllBlogPosts, createBlogPost } from "@/lib/blog-service"

export async function GET() {
  try {
    console.log("API route: Fetching all blog posts")
    const posts = await getAllBlogPosts()
    console.log(`API route: Successfully fetched ${posts.length} blog posts`)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("API route error fetching blog posts:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch blog posts" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("API route: Creating new blog post with data:", body)

    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json({ error: "Title, content, and author are required" }, { status: 400 })
    }

    const newPost = await createBlogPost({
      title: body.title,
      content: body.content,
      author: body.author,
    })

    console.log("API route: Successfully created blog post with ID:", newPost.id)
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("API route error creating blog post:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create blog post" },
      { status: 500 },
    )
  }
}

