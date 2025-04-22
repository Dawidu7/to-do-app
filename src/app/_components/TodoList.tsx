"use client"

import Todo from "./Todo"
import TodoControl from "./TodoControl"
import { sortOptions } from "./TodoControl"
import { useState } from "react"
import { Separator } from "~/components/ui/separator"
import type { TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

export default function TodoList({
  initialData,
}: {
  initialData: TodoModel[]
}) {
  const [search, setSearch] = useState("")
  const [sortFn, setSortFn] = useState<(a: TodoModel, b: TodoModel) => number>(
    () => sortOptions[0]!.callback,
  )
  const todos = api.todo.getTodos.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <>
      <TodoControl
        search={search}
        setSearch={setSearch}
        setSortFn={setSortFn}
      />
      <Separator className="my-2" />
      <ul>
        {todos.data
          .filter(({ content }) => content.toLowerCase().includes(search))
          .sort(sortFn)
          .map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
      </ul>
    </>
  )
}
