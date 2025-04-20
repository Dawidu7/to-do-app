import { createTRPCRouter, publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "~/server/db"
import { todo } from "~/server/db/schema"

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async () => await db.query.todo.findMany()),
  getTodo: publicProcedure.input(z.number()).query(
    async ({ input }) =>
      await db.query.todo.findFirst({
        where: () => eq(todo.id, input),
      }),
  ),
  addTodo: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      const [addedTodo] = await db.insert(todo).values(input).returning()

      if (!addedTodo) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })

      return addedTodo
    }),
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string().optional(),
        isComplete: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...values } = input
      const [updatedTodo] = await db
        .update(todo)
        .set(values)
        .where(eq(todo.id, id))
        .returning()

      if (!updatedTodo) throw new TRPCError({ code: "NOT_FOUND" })

      return updatedTodo
    }),
  deleteTodo: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    const [deletedTodo] = await db
      .delete(todo)
      .where(eq(todo.id, input))
      .returning()

    if (!deletedTodo) throw new TRPCError({ code: "NOT_FOUND" })

    return deletedTodo
  }),
})
