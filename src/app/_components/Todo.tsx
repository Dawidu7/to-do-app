"use client"

import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { type TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

type TodoProps = {
  values: TodoModel
}

export default function Todo({ values }: TodoProps) {
  const deleteTodo = api.todo.deleteTodo.useMutation()
  const router = useRouter()

  return (
    <li className="flex gap-4 items-center">
      <input
        type="checkbox"
        name="is_complete"
        defaultChecked={values.isComplete}
      />
      <p>
        {values.content}{" "}
        <small className="text-xs text-zinc-600">
          {values.dueDate?.toDateString()}
        </small>
      </p>
      <Button
        variant="ghost"
        size="sm"
        className="hover:cursor-pointer"
        onClick={() => {
          deleteTodo.mutate(values.id)
          router.refresh()
        }}
      >
        <Trash2 />
      </Button>
    </li>
  )
}
