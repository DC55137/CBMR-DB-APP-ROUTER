// actions/deleteTodo.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteTodo(id: string) {
  try {
    await prisma.todo.delete({ where: { id } });
    revalidatePath("/todos");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return { success: false, error: "Failed to delete todo" };
  }
}
