import { NextResponse } from "next/server"
import Parse from "parse"
import { ensureBlogPostClass } from "@/lib/ensure-schema"

export async function GET() {
  try {
    // Initialize Parse
    if (!Parse.applicationId) {
      Parse.initialize("rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X")
      Parse.serverURL = "https://parseapi.back4app.com/"
    }

    // Ensure the BlogPost class exists
    await ensureBlogPostClass()

    // Create a test object in the BlogPost class
    const BlogPost = Parse.Object.extend("BlogPost")
    const testPost = new BlogPost()
    testPost.set("title", "Test Post")
    testPost.set("content", "This is a test post created by the API test endpoint.")
    testPost.set("author", "API Test")

    // Save the test post
    const result = await testPost.save()

    return NextResponse.json({
      success: true,
      message: "Parse connection successful and BlogPost class is ready",
      objectId: result.id,
    })
  } catch (error) {
    console.error("Parse test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

