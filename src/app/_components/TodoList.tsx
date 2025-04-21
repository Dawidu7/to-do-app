"use client"

import Todo from "./Todo"
import { Separator } from "~/components/ui/separator"
import type { TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

export default function TodoList({
  initialData,
}: {
  initialData: TodoModel[]
}) {
  const todos = api.todo.getTodos.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <>
      <Separator className="my-2" />
      <ul>
        {todos.data
          .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
          .map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
      </ul>
    </>
  )
}
