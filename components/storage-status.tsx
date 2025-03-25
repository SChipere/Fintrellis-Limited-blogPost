"use client"

import { useState, useEffect } from "react"
import { HardDrive } from "lucide-react"
import { getStorageMode, checkParseConnection } from "@/lib/client-data-service"

export default function StorageStatus() {
  const [usingLocalStorage, setUsingLocalStorage] = useState(false)

  useEffect(() => {
    const checkStorage = async () => {
      // First check if Parse is connected
      const isConnected = await checkParseConnection()

      // Then get the current storage mode
      const { usingLocalStorage } = getStorageMode()
      setUsingLocalStorage(usingLocalStorage)
    }

    checkStorage()

    // Check periodically
    const interval = setInterval(checkStorage, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!usingLocalStorage) return null

  return (
    <div className="fixed bottom-4 right-4 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 p-3 rounded-lg shadow-md flex items-center gap-2 max-w-xs z-50">
      <HardDrive className="h-5 w-5 flex-shrink-0" />
      <div className="text-sm">
        <p className="font-medium">Using Local Storage</p>
        <p className="text-xs">
          Back4App connection unavailable. Data is stored locally and will be lost on page refresh.
        </p>
      </div>
    </div>
  )
}

