"use client"

import Todo from "./Todo"
import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import type { TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

export default function TodoList({
  initialData,
}: {
  initialData: TodoModel[]
}) {
  const [search, setSearch] = useState("")
  const todos = api.todo.getTodos.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <>
      <div>
        <Input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Separator className="my-2" />
      <ul>
        {todos.data
          .filter(({ content }) => content.toLowerCase().includes(search))
          .sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
          .map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
      </ul>
    </>
  )
}
