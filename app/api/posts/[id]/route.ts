import { NextResponse } from "next/server"
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/blog-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`API route: Fetching blog post with ID: ${params.id}`)
    const post = await getBlogPostById(params.id)
    console.log("API route: Successfully fetched blog post")
    return NextResponse.json(post)
  } catch (error) {
    console.error("API route error fetching blog post:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Blog post not found" }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    console.log(`API route: Updating blog post with ID: ${params.id}`)

    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json({ error: "Title, content, and author are required" }, { status: 400 })
    }

    const post = await updateBlogPost(params.id, {
      title: body.title,
      content: body.content,
      author: body.author,
    })

    console.log("API route: Successfully updated blog post")
    return NextResponse.json(post)
  } catch (error) {
    console.error("API route error updating blog post:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update blog post" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`API route: Deleting blog post with ID: ${params.id}`)
    await deleteBlogPost(params.id)
    console.log("API route: Successfully deleted blog post")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API route error deleting blog post:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete blog post" },
      { status: 500 },
    )
  }
}

