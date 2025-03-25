import { NextResponse } from "next/server"
import { getPosts } from "@/lib/data-service"

// This is a helper endpoint to check if we're using the local storage fallback
export async function GET() {
  try {
    // This will try Parse first and fall back to local storage if needed
    await getPosts()

    // Check if we're using the fallback by looking at the module
    const dataService = require("@/lib/data-service")

    return NextResponse.json({
      usingFallback: dataService.useLocalStorageFallback || false,
    })
  } catch (error) {
    console.error("Error checking storage status:", error)
    return NextResponse.json({
      usingFallback: true,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

