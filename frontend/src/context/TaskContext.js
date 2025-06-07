import React, { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const addTask = async (task) => {
    const newTask = { ...task, id: Date.now(), status: "pending" };
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const value = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
