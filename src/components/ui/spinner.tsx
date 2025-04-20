import { Loader2 } from "lucide-react"
import { cn } from "~/lib/utils"

export function Spinner() {
  return (
    <span className={cn("animate-spin")}>
      <Loader2 />
    </span>
  )
}
