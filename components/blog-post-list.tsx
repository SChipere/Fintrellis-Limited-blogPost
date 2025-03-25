"use client"

import { useState, useEffect } from "react"
import { getAllPosts, deletePostById } from "@/lib/db"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import BlogPostCard from "./blog-post-card"
import { motion } from "framer-motion"

export default function BlogPostList() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPosts()
        setPosts(postsData)
        setError(null)
      } catch (error) {
        console.error("Failed to load posts:", error)
        setError(error instanceof Error ? error.message : "Failed to load posts")
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load posts. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [toast])

  const handleDelete = async (id: string) => {
    try {
      const success = await deletePostById(id)
      if (success) {
        setPosts(posts.filter((post) => post.objectId !== id))
        toast({
          title: "Success",
          description: "Post deleted successfully",
        })
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-12 bg-muted/30 rounded-lg border border-muted">
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <div className="rounded-full bg-amber-100 p-3 text-amber-600 mb-2">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold">Error Loading Posts</h2>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">{error}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button onClick={() => router.refresh()} className="w-full sm:w-auto">
            Refresh Page
          </Button>
          <Link href="/create">
            <Button variant="outline" className="w-full sm:w-auto">
              Try Creating a New Post
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center p-12 bg-muted/30 rounded-lg border border-muted">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">No posts found</h2>
          <p className="text-muted-foreground mb-6">Get started by creating your first blog post</p>
          <Link href="/create">
            <Button size="lg" className="px-8">
              Create New Post
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <motion.div
          key={post.objectId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <BlogPostCard post={post} onDelete={() => handleDelete(post.objectId)} />
        </motion.div>
      ))}
    </div>
  )
}

