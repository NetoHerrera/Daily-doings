import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-gray-400 mt-2">
          Adicione sua primeira tarefa usando o formulário acima
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Suas Tarefas</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
