import React, { useState } from 'react';
import PriorityTag from './PriorityTag';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...task });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3 hover:shadow-md transition-shadow">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <PriorityTag priority={task.priority} />
          </div>
          <p className="text-gray-600 my-2">{task.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
            <select 
              value={task.status} 
              onChange={handleStatusChange}
              className={`px-3 py-1 rounded text-sm ${
                task.status === 'completed' 
                  ? 'bg-green-200 text-green-800' 
                  : task.status === 'in-progress' 
                    ? 'bg-yellow-200 text-yellow-800' 
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              <option value="pending">Pendente</option>
              <option value="in-progress">Em Andamento</option>
              <option value="completed">Concluída</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-3">
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Editar
            </button>
            <button 
              
              className="text-red-600 hover:text-red-800"
            >
              Excluir
            </button>
          </div>
        </>
      ) : (
        
      )}
    </div>
  );
};

export default TaskItem;