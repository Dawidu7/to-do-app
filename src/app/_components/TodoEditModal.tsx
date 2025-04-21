import { zodResolver } from "@hookform/resolvers/zod"
import { Edit } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Spinner } from "~/components/ui/spinner"
import { type TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

const editFormSchema = z.object({ content: z.string() })
type EditFormValues = z.infer<typeof editFormSchema>

export default function TodoEditModal({ todo }: { todo: TodoModel }) {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: { content: todo.content },
  })
  const utils = api.useUtils()
  const updateTodo = api.todo.updateTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.getTodos.refetch()
      setIsOpen(false)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Close
          </Button>
          <Button
            onClick={form.handleSubmit(() =>
              updateTodo.mutate({ id: todo.id, ...form.getValues() }),
            )}
          >
            {updateTodo.isPending ? <Spinner /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
