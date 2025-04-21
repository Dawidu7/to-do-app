import { Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Spinner } from "~/components/ui/spinner"
import { type TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

export default function TodoDeleteModal({ todo }: { todo: TodoModel }) {
  const [isOpen, setIsOpen] = useState(false)
  const utils = api.useUtils()
  const deleteTodo = api.todo.deleteTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.getTodos.refetch()
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this todo?</DialogTitle>
          <DialogDescription>
            <span className="font-semibold">Content:</span> {todo.content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Close
          </Button>
          <Button
            onClick={() => deleteTodo.mutate(todo.id)}
            variant="destructive"
          >
            {deleteTodo.isPending ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
