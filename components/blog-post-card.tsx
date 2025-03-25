"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, Calendar, User } from "lucide-react"
import Link from "next/link"
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
import { cn } from "@/lib/utils"

interface BlogPostCardProps {
  post: {
    objectId: string
    title: string
    content: string
    author: string
    createdAt: string
    updatedAt: string
  }
  onDelete: (id: string) => Promise<void>
  className?: string
}

export default function BlogPostCard({ post, onDelete, className }: BlogPostCardProps) {
  const formattedDate = post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ""

  // Generate a random pastel color for the card accent
  const colors = [
    "from-rose-500/20 to-orange-500/20 border-rose-500/10",
    "from-blue-500/20 to-cyan-500/20 border-blue-500/10",
    "from-green-500/20 to-emerald-500/20 border-green-500/10",
    "from-violet-500/20 to-purple-500/20 border-violet-500/10",
    "from-amber-500/20 to-yellow-500/20 border-amber-500/10",
  ]

  const colorIndex = Math.abs(post.title.charCodeAt(0) % colors.length)
  const cardColor = colors[colorIndex]

  return (
    <Card
      className={cn(
        "overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-lg border bg-gradient-to-br",
        cardColor,
        className,
      )}
    >
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-primary to-primary/60 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/posts/${post.objectId}`} className="group-hover:text-primary transition-colors">
            <h3 className="font-semibold text-xl line-clamp-2">{post.title}</h3>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <Link href={`/posts/${post.objectId}`}>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Read more
          </Button>
        </Link>

        <div className="flex space-x-1">
          <Link href={`/posts/${post.objectId}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/edit/${post.objectId}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
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
                  onClick={() => onDelete(post.objectId)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  )
}

