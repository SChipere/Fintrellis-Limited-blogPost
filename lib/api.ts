import Parse from "parse";

// Initialize Parse
Parse.initialize(
  "rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", // APP_ID
  "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X"  // JAVASCRIPT_KEY
);
Parse.serverURL = "https://parseapi.back4app.com/";

interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

interface UpdatePostData {
  title: string;
  content: string;
  author: string;
}

// Get all posts
export async function getPosts() {
  const BlogPost = Parse.Object.extend("BlogPost");
  const query = new Parse.Query(BlogPost);
  
  try {
    const results = await query.find();
    return results.map(post => ({
      objectId: post.id,
      title: post.get("title"),
      content: post.get("content"),
      author: post.get("author"),
      createdAt: post.get("createdAt"),
      updatedAt: post.get("updatedAt"),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

// Get a single post by ID
export async function getPost(objectId: string) {
  const BlogPost = Parse.Object.extend("BlogPost");
  const query = new Parse.Query(BlogPost);
  
  try {
    const post = await query.get(objectId);
    return {
      objectId: post.id,
      title: post.get("title"),
      content: post.get("content"),
      author: post.get("author"),
      createdAt: post.get("createdAt"),
      updatedAt: post.get("updatedAt"),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
}

// Create a new post
export async function createPost(data: CreatePostData) {
  const BlogPost = Parse.Object.extend("BlogPost");
  const post = new BlogPost();

  post.set("title", data.title);
  post.set("content", data.content);
  post.set("author", data.author);

  try {
    const savedPost = await post.save();
    return {
      objectId: savedPost.id,
      title: savedPost.get("title"),
      content: savedPost.get("content"),
      author: savedPost.get("author"),
      createdAt: savedPost.get("createdAt"),
      updatedAt: savedPost.get("updatedAt"),
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}

// Update an existing post
export async function updatePost(objectId: string, data: UpdatePostData) {
  const BlogPost = Parse.Object.extend("BlogPost");
  const query = new Parse.Query(BlogPost);

  try {
    const post = await query.get(objectId);

    post.set("title", data.title);
    post.set("content", data.content);
    post.set("author", data.author);

    const updatedPost = await post.save();
    return {
      objectId: updatedPost.id,
      title: updatedPost.get("title"),
      content: updatedPost.get("content"),
      author: updatedPost.get("author"),
      createdAt: updatedPost.get("createdAt"),
      updatedAt: updatedPost.get("updatedAt"),
    };
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
}

// Delete a post
export async function deletePost(objectId: string) {
  const BlogPost = Parse.Object.extend("BlogPost");
  const query = new Parse.Query(BlogPost);

  try {
    const post = await query.get(objectId);
    await post.destroy();
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}

