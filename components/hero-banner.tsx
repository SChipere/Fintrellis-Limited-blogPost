import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary rounded-lg mb-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      </div>

      <div className="relative px-6 py-12 md:py-16 md:px-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">Blog Post Manager</h1>
            <p className="text-primary-foreground/80 max-w-md text-lg">
              Create, manage, and organize your blog posts with this powerful and intuitive platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/create">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create New Post
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-black hover:bg-white/10 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent rounded-lg" />
            <div className="w-64 h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl p-4 rotate-3 transform transition-transform hover:rotate-0 duration-300">
              <div className="h-3 w-3/4 bg-white/20 rounded mb-4"></div>
              <div className="h-3 w-full bg-white/20 rounded mb-2"></div>
              <div className="h-3 w-full bg-white/20 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-white/20 rounded mb-6"></div>
              <div className="h-20 w-full bg-white/10 rounded mb-4"></div>
              <div className="h-3 w-1/2 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

