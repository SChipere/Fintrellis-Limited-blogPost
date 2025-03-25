import Link from "next/link"
import { BookOpen, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">Blog Post Manager</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              A modern platform for managing your blog content
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Blog Manager. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

