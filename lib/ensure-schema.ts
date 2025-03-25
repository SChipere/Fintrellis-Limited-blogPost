import Parse from "parse"

// Initialize Parse on the server side
if (typeof window === "undefined") {
  // Make sure Parse is only initialized once
  if (!Parse.applicationId) {
    Parse.initialize("rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X")
    Parse.serverURL = "https://parseapi.back4app.com/"
    console.log("Parse initialized in ensure-schema")
  }
}

// Function to ensure the BlogPost class exists in Back4App
export async function ensureBlogPostClass() {
  try {
    console.log("Checking if BlogPost class exists...")

    // Instead of using the Schema API, we'll try to create a test object
    // If the class doesn't exist, Parse will create it automatically
    const BlogPost = Parse.Object.extend("BlogPost")

    // Try to query the class to see if it exists
    const query = new Parse.Query(BlogPost)
    query.limit(0) // We don't need any results, just checking if the class exists

    try {
      await query.find()
      console.log("BlogPost class already exists")
      return true
    } catch (error) {
      // If there's an error, it might be because the class doesn't exist
      // Let's try to create a temporary object to force class creation
      console.log("Error querying BlogPost class, attempting to create it:", error)

      const tempPost = new BlogPost()
      tempPost.set("title", "_temp_title_")
      tempPost.set("content", "_temp_content_")
      tempPost.set("author", "_temp_author_")

      const result = await tempPost.save()
      console.log("Created temporary post to ensure class exists:", result.id)

      // Now delete the temporary object
      await result.destroy()
      console.log("Deleted temporary post")

      return true
    }
  } catch (error) {
    console.error("Error ensuring BlogPost class exists:", error)
    // Don't throw an error, just log it and return false
    // This allows the application to continue even if we can't ensure the class exists
    return false
  }
}

