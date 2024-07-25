// components/dashboard/DashboardTodoList.tsx
"use client";
import { useState, useCallback } from "react";
import { Todo } from "@prisma/client";
import { CheckSquare, Square } from "lucide-react";
import updateTodo from "@/actions/updateTodo";

interface DashboardTodoListProps {
  todos: Todo[];
}

export default function DashboardTodoList({
  todos: initialTodos,
}: DashboardTodoListProps) {
  const [completedVisible, setCompletedVisible] = useState(true);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const filteredTodos = completedVisible
    ? todos
    : todos.filter((todo) => !todo.isCompleted);

  const handleUpdateTodo = useCallback(
    async (id: string, isCompleted: boolean) => {
      // Optimistic update
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );

      try {
        const result = await updateTodo({ id, isCompleted: !isCompleted });
        if (!result.success) {
          // If the server update fails, revert the optimistic update
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
            )
          );
          console.error("Failed to update todo:", result.error);
        }
      } catch (error) {
        // If there's an error, revert the optimistic update
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
          )
        );
        console.error("Error updating todo:", error);
      }
    },
    []
  );

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">
          Chris&apos; To-Do List
        </h2>
        <button
          onClick={() => setCompletedVisible(!completedVisible)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {completedVisible ? "Hide Completed" : "Show Completed"}
        </button>
      </div>
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center space-x-2 break-words">
            <button
              onClick={() => handleUpdateTodo(todo.id, todo.isCompleted)}
              className="flex-shrink-0"
            >
              {todo.isCompleted ? (
                <CheckSquare className="text-green-500 w-5 h-5" />
              ) : (
                <Square className="text-gray-400 w-5 h-5" />
              )}
            </button>
            <span
              className={`${
                todo.isCompleted ? "line-through text-gray-500" : ""
              } flex-grow`}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
