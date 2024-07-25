// actions/updateTodo.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateTodoParams {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date | null;
}

export default async function updateTodo({
  id,
  title,
  description,
  isCompleted,
  dueDate,
}: UpdateTodoParams) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(isCompleted !== undefined && { isCompleted }),
        ...(dueDate !== undefined && { dueDate }),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/todos");
    return { success: true, todo: updatedTodo };
  } catch (error) {
    console.error("Failed to update todo:", error);
    return { success: false, error: "Failed to update todo" };
  }
}
