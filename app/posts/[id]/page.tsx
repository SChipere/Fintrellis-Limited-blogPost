"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getPostById, deletePostById } from "@/lib/db"
import { ArrowLeft, Edit, Trash2, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"

export default function PostDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(params.id)
        setPost(postData)
        setIsLoading(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load post. Please try again.",
          variant: "destructive",
        })
        router.push("/")
      }
    }

    fetchPost()
  }, [params.id, router, toast])

  const handleDelete = async () => {
    try {
      await deletePostById(params.id)
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
      router.push("/")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="flex items-center text-muted-foreground mb-6 hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to posts
      </Link>

      <Card className="max-w-4xl mx-auto border bg-card/50 backdrop-blur-sm">
        {isLoading ? (
          <>
            <CardHeader className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight">{post?.title}</h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post?.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {post?.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/edit/${params.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive/30 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                {post?.content.split("\n").map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t pt-6">
              Last updated: {post?.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : ""}
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

