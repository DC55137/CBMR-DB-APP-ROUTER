// app/todo/_components/TodoList.tsx

"use client";

import { useState, useTransition } from "react";
import { Todo } from "@prisma/client";
import { CheckSquare, Square, Trash, Edit, Plus, Save } from "lucide-react";
import updateTodo from "@/actions/updateTodo";
import deleteTodo from "@/actions/deleteTodo";
import addTodo from "@/actions/addTodo";

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggleTodo = async (id: string, isCompleted: boolean) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      )
    );

    startTransition(async () => {
      const result = await updateTodo({ id, isCompleted: !isCompleted });
      if (!result.success) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
          )
        );
      }
    });
  };

  const handleDeleteTodo = async (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    startTransition(async () => {
      const result = await deleteTodo(id);
      if (!result.success) {
        setTodos(initialTodos);
      }
    });
  };

  const handleEditTodo = async (e: React.FormEvent, todo: Todo) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    if (!title.trim() || title === todo.title) {
      setEditingId(null);
      return;
    }

    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, title } : t)));
    setEditingId(null);

    startTransition(async () => {
      const result = await updateTodo({ id: todo.id, title });
      if (!result.success) {
        setTodos(initialTodos);
      }
    });
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    if (!title.trim()) return;

    startTransition(async () => {
      const result = await addTodo(formData);
      if (result.success && result.todo) {
        setTodos([result.todo, ...todos]);
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <div className="bg-main-2 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleAddTodo} className="mb-6 flex">
        <input
          type="text"
          name="title"
          placeholder="Add new todo"
          className="flex-grow p-2 bg-main-3 text-main-12 border border-main-5 rounded-l focus:outline-none focus:border-main-7"
        />
        <button
          type="submit"
          className="bg-main-6 hover:bg-main-7 text-white p-2 rounded-r transition duration-200"
          disabled={isPending}
        >
          {isPending ? "Adding..." : <Plus className="w-5 h-5" />}
        </button>
      </form>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center bg-main-3 rounded-lg overflow-hidden"
          >
            {editingId === todo.id ? (
              <form
                onSubmit={(e) => handleEditTodo(e, todo)}
                className="flex-grow flex"
              >
                <input
                  type="text"
                  name="title"
                  defaultValue={todo.title}
                  className="flex-grow p-2 bg-main-4 text-main-12 border-none focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-main-7 hover:bg-main-8 text-white p-2 transition duration-200"
                >
                  <Save className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <>
                <span
                  className={`flex-grow p-2 ${
                    todo.isCompleted
                      ? "line-through text-main-9"
                      : "text-main-12"
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => setEditingId(todo.id)}
                  className="bg-main-5 hover:bg-main-6 text-white p-2 transition duration-200"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleToggleTodo(todo.id, todo.isCompleted)}
                  className="bg-main-6 hover:bg-main-7 text-white p-2 transition duration-200"
                >
                  {todo.isCompleted ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 transition duration-200"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
