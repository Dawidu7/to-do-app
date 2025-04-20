"use client"

import Todo from "./Todo"
import type { TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

type TodoListProps = {
  initialData: TodoModel[]
}

export default function TodoList({ initialData }: TodoListProps) {
  const todos = api.todo.getTodos.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <ul>
      {todos.data.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
