import HeroBanner from "@/components/hero-banner"
import BlogPostList from "@/components/blog-post-list"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <HeroBanner />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
              <path d="M10 2c1 .5 2 2 2 5" />
            </svg>
          </span>
          Latest Blog Posts
        </h2>

        <Suspense
          fallback={
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <BlogPostList />
        </Suspense>
      </div>
    </main>
  )
}

