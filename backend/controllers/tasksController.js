const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }

    const newTask = await Task.create({
      title,
      description,
      deadline: new Date(deadline),
      priority,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, priority, status } = req.body;

    const updatedTask = await Task.update(id, {
      title,
      description,
      deadline: new Date(deadline),
      priority,
      status,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
