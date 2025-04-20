import { type InferSelectModel } from "drizzle-orm"
import {
  boolean,
  serial,
  pgTable as table,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const todo = table("todo", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  isComplete: boolean("is_complete").notNull().default(false),
  dueDate: timestamp("due_date"),
})

export type TodoModel = InferSelectModel<typeof todo>
