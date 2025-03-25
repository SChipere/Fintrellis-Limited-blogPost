"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check if we're connected to Back4App
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/connection-status")
        const data = await response.json()

        setIsConnected(data.connected)

        if (data.connected) {
          toast({
            title: "Connected to Back4App",
            description: "Your blog posts are being stored in the cloud.",
            variant: "default",
          })
        } else {
          toast({
            title: "Connection Error",
            description: "Could not connect to Back4App. Please check your connection.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error checking connection status:", error)
        setIsConnected(false)
      }
    }

    checkConnection()
  }, [toast])

  if (isConnected === null) return null

  return (
    <div
      className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-md flex items-center gap-2 max-w-xs z-50 ${
        isConnected
          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
      }`}
    >
      {isConnected ? <CheckCircle2 className="h-5 w-5 flex-shrink-0" /> : <XCircle className="h-5 w-5 flex-shrink-0" />}
      <div className="text-sm">
        <p className="font-medium">{isConnected ? "Connected to Back4App" : "Connection Error"}</p>
        <p className="text-xs">
          {isConnected
            ? "Your blog posts are being stored in the cloud."
            : "Could not connect to Back4App. Please check your connection."}
        </p>
      </div>
    </div>
  )
}

