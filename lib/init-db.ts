import Parse from "parse"
import { ensureBlogPostClass } from "./ensure-schema"

// Initialize Parse on the server side
if (typeof window === "undefined") {
  // Make sure Parse is only initialized once
  if (!Parse.applicationId) {
    Parse.initialize("rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X")
    Parse.serverURL = "https://parseapi.back4app.com/"
    console.log("Parse initialized in init-db")
  }
}

export async function initializeDatabase() {
  // Only run on the server
  if (typeof window !== "undefined") {
    return
  }

  try {
    // Ensure the BlogPost class exists
    await ensureBlogPostClass()

    // Check if we already have posts
    const BlogPost = Parse.Object.extend("BlogPost")
    const query = new Parse.Query(BlogPost)
    const count = await query.count()

    // If we have no posts, add some sample data
    if (count === 0) {
      console.log("No posts found, adding sample data...")

      const samplePosts = [
        {
          title: "Getting Started with Next.js",
          content:
            "Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's a powerful tool for building modern web applications.\n\nIn this post, we'll explore the basics of Next.js and how to get started with it.",
          author: "Jane Doe",
        },
        {
          title: "Understanding React Hooks",
          content:
            "React Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class component.\n\nIn this post, we'll dive deep into React Hooks and how they can simplify your code.",
          author: "John Smith",
        },
      ]

      // Create sample posts
      for (const postData of samplePosts) {
        const post = new BlogPost()
        post.set("title", postData.title)
        post.set("content", postData.content)
        post.set("author", postData.author)
        await post.save()
      }

      console.log("Sample data initialized")
    } else {
      console.log(`Found ${count} existing posts, skipping sample data initialization`)
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

