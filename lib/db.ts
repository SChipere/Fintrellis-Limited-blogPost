import { getPosts, getPost, createPost, updatePost, deletePost } from "./api";


// Define Post Type
export interface Post {
  objectId: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// Get all posts from Back4App
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const data = await getPosts();
    return data.map((post: any) => ({
      objectId: post.objectId,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};

// Get a post by ID
export const getPostById = async (id: string): Promise<Post | undefined> => {
  try {
    const post = await getPost(id);
    return {
      objectId: post.objectId,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching post by ID", error);
    return undefined;
  }
};

// Add a new post using Back4App API
export const addPost = async (data: { title: string; content: string; author: string }): Promise<Post> => {
  try {
    const newPost = await createPost(data);
    return {
      objectId: newPost.objectId,
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
    };
  } catch (error) {
    console.error("Error creating new post", error);
    throw new Error("Failed to create post");
  }
};

// Update an existing post using Back4App API
export const updatePostById = async (
  id: string,
  data: { title: string; content: string; author: string }
): Promise<Post | undefined> => {
  try {
    const updatedPost = await updatePost(id, data);
    return {
      objectId: updatedPost.objectId,
      title: updatedPost.title,
      content: updatedPost.content,
      author: updatedPost.author,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  } catch (error) {
    console.error("Error updating post", error);
    return undefined;
  }
};

// Delete a post by ID
export const deletePostById = async (id: string): Promise<boolean> => {
  try {
    await deletePost(id);
    return true;
  } catch (error) {
    console.error("Error deleting post", error);
    return false;
  }
};

