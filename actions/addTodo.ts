// actions/addTodo.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title || typeof title !== "string") {
    throw new Error("Invalid title");
  }

  try {
    const newTodo = await prisma.todo.create({
      data: { title },
    });

    revalidatePath("/todos");
    return { success: true, todo: newTodo };
  } catch (error) {
    console.error("Failed to add todo:", error);
    return { success: false, error: "Failed to add todo" };
  }
}
