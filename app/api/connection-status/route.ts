import { NextResponse } from "next/server"
import Parse from "parse"
import { initializeParse } from "@/lib/parse-config"

export async function GET() {
  try {
    // Initialize Parse
    initializeParse()

    // Try to query the BlogPost class to check connection
    const BlogPostClass = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPostClass)
    query.limit(1) // We just need to check if the query works

    await query.find()

    return NextResponse.json({
      connected: true,
      message: "Successfully connected to Back4App",
    })
  } catch (error) {
    console.error("Error checking connection to Back4App:", error)
    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to connect to Back4App",
    })
  }
}

