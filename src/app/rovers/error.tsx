'use client'
import ErrorMessage from "@/components/ui/ErrorMessage"
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) { 
  return (
    <div>
     <ErrorMessage message="Something went wrong!" onRetry={ () => reset()}/>
    </div>
  )
}