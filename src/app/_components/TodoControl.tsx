import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { type TodoModel } from "~/server/db/schema"

type TodoControlProps = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setSortFn: React.Dispatch<
    React.SetStateAction<(a: TodoModel, b: TodoModel) => number>
  >
}

export const sortOptions = [
  {
    label: "Incomplete First",
    callback: (a: TodoModel, b: TodoModel) =>
      Number(a.isComplete) - Number(b.isComplete),
  },
  {
    label: "Complete First",
    callback: (a: TodoModel, b: TodoModel) =>
      Number(b.isComplete) - Number(a.isComplete),
  },
  {
    label: "A-Z (Content)",
    callback: (a: TodoModel, b: TodoModel) =>
      a.content.localeCompare(b.content),
  },
  {
    label: "Z-A (Content)",
    callback: (a: TodoModel, b: TodoModel) =>
      b.content.localeCompare(a.content),
  },
]

export default function TodoControl({
  search,
  setSearch,
  setSortFn,
}: TodoControlProps) {
  return (
    <div className="flex gap-4">
      <Input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Select
        defaultValue={sortOptions[0]!.label}
        onValueChange={value =>
          setSortFn(
            () => sortOptions.find(({ label }) => label === value)!.callback,
          )
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(option => (
            <SelectItem key={option.label} value={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
