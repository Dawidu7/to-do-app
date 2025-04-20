import TodoList from "./_components/TodoList"
import { api } from "~/trpc/server"

export default async function Home() {
  const todos = await api.todo.getTodos()

  return (
    <div>
      <TodoList initialData={todos} />
    </div>
  )
}
