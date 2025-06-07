const db = require("../config/db");

class Task {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM tasks ORDER BY deadline");
    return rows;
  }

  static async create({ title, description, deadline, priority }) {
    const [result] = await db.query(
      "INSERT INTO tasks (title, description, deadline, priority, status) VALUES (?, ?, ?, ?, 'pending')",
      [title, description, deadline, priority]
    );
    return this.getById(result.insertId);
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  }

  static async update(id, { title, description, deadline, priority, status }) {
    await db.query(
      "UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ?, status = ? WHERE id = ?",
      [title, description, deadline, priority, status, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return true;
  }
}

module.exports = Task;
