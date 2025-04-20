import TodoDeleteModal from "./TodoDeleteModal"
import TodoEditModal from "./TodoEditModal"
import { type TodoModel } from "~/server/db/schema"

type TodoProps = {
  todo: TodoModel
}

export default function Todo({ todo }: TodoProps) {
  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
      <input
        type="checkbox"
        name="is_complete"
        defaultChecked={todo.isComplete}
      />
      <p>{todo.content} </p>
      <div className="space-x-1">
        <TodoEditModal todo={todo} />
        <TodoDeleteModal todo={todo} />
      </div>
    </li>
  )
}
