"use client"

import Parse from "parse"

// Track initialization state
let isInitialized = false

// Initialize Parse only on the client side
export function initializeParse() {
  if (typeof window === "undefined") {
    console.log("Skipping Parse initialization on server side")
    return false
  }

  if (isInitialized) {
    return true
  }

  try {
    Parse.initialize("rN1vuA0wpIbIKygeNkdTGn9aRZPxNLo3XCAdltVb", "hxZ9TDpv9IGVYxhoXCTJVLJkSovIlhTZdRJPZn5X")
    Parse.serverURL = "https://parseapi.back4app.com/"
    isInitialized = true
    console.log("Parse initialized successfully on client side")
    return true
  } catch (error) {
    console.error("Failed to initialize Parse:", error)
    return false
  }
}

export default Parse

