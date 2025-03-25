// In-memory database for blog posts as a fallback
// This will be used if Back4App is not available

export interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

// Initial sample data
let posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's a powerful tool for building modern web applications.\n\nIn this post, we'll explore the basics of Next.js and how to get started with it.",
    author: "Jane Doe",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "2",
    title: "Understanding React Hooks",
    content:
      "React Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class component.\n\nIn this post, we'll dive deep into React Hooks and how they can simplify your code.",
    author: "John Smith",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
]

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15)
}

// Get all posts
export const getAllPosts = (): Post[] => {
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get a post by ID
export const getPostById = (id: string): Post | undefined => {
  return posts.find((post) => post.id === id)
}

// Add a new post
export const addPost = (data: { title: string; content: string; author: string }): Post => {
  const now = new Date().toISOString()
  const newPost: Post = {
    id: generateId(),
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: now,
    updatedAt: now,
  }

  posts.unshift(newPost)
  return newPost
}

// Update a post
export const updatePostById = (
  id: string,
  data: { title: string; content: string; author: string },
): Post | undefined => {
  const index = posts.findIndex((post) => post.id === id)

  if (index === -1) {
    return undefined
  }

  const updatedPost: Post = {
    ...posts[index],
    title: data.title,
    content: data.content,
    author: data.author,
    updatedAt: new Date().toISOString(),
  }

  posts[index] = updatedPost
  return updatedPost
}

// Delete a post
export const deletePostById = (id: string): boolean => {
  const initialLength = posts.length
  posts = posts.filter((post) => post.id !== id)
  return posts.length < initialLength
}

