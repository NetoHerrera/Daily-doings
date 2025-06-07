import React, { useState } from "react";
import { TaskProvider, useTasks } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const AppContent = () => {
  const { tasks, addTask } = useTasks();
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter((task) => task.status !== "completed");

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">📋 Daily Doings</h1>
          <p className="text-gray-600">Organize suas tarefas diárias</p>
        </header>

        <TaskForm onSave={addTask} />

        <div className="flex items-center mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="mr-2 h-4 w-4"
            />
            <span className="text-gray-700">Mostrar tarefas concluídas</span>
          </label>
        </div>

        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
};

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
