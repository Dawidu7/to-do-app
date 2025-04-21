import TodoDeleteModal from "./TodoDeleteModal"
import TodoEditModal from "./TodoEditModal"
import { useState } from "react"
import { type TodoModel } from "~/server/db/schema"
import { api } from "~/trpc/react"

export default function Todo({ todo }: { todo: TodoModel }) {
  const utils = api.useUtils()
  const updateTodo = api.todo.updateTodo.useMutation({
    onSettled: () => utils.todo.getTodos.refetch(),
  })
  const [isChecked, setIsChecked] = useState(todo.isComplete)

  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
      <input
        type="checkbox"
        name="is_complete"
        defaultChecked={isChecked}
        disabled={updateTodo.isPending}
        onChange={() => {
          const isComplete = !isChecked
          setIsChecked(isComplete)
          updateTodo.mutate({ id: todo.id, isComplete })
        }}
      />
      <p className={isChecked ? "text-gray-400 line-through" : ""}>
        {todo.content}
      </p>
      <div className="space-x-1">
        <TodoEditModal todo={todo} />
        <TodoDeleteModal todo={todo} />
      </div>
    </li>
  )
}
