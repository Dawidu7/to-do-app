import Todo from "./_components/Todo"
import { api } from "~/trpc/server"

export default async function Home() {
  const todos = await api.todo.getTodos()

  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} values={todo} />
      ))}
    </ul>
  )
}
