// app/todos/page.tsx
import TodoList from "./_components/TodoList";
import prisma from "@/lib/prisma";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-main-11">To-Do List</h1>
      <TodoList initialTodos={todos} />
    </div>
  );
}
