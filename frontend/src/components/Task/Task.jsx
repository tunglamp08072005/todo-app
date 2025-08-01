import React, { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";
import axios from "../../Axios/axios";
import "./Task.css";

function Task({ task }) {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");

  const handleToggle = async () => {
    try {
      await axios.patch(`/task/markDone/${task._id}`);
      dispatch({ type: "MARK_DONE", id: task._id });
    } catch (error) {
      console.error("Toggle Task Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/task/delete/${task._id}`);
      dispatch({ type: "REMOVE_TASK", id: task._id });
    } catch (error) {
      console.error("Delete Task Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(`/task/update/${task._id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      dispatch({ type: "UPDATE_TASK", task: res.data });
      setIsEditing(false);
    } catch (error) {
      console.error("Update Task Error:", error.response?.data || error);
    }
  }

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />

        {isEditing ? (
          <div className="task-info">
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border px-2 py-1 rounded w-full mt-1"
            />
            <div className="flex gap-2 mt-1">
              <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={handleUpdate}>Lưu</button>
              <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => setIsEditing(false)}>Hủy</button>
            </div>
          </div>
        ) : (
          <div className="task-info">
            <h4>{task.title}</h4>
            {task.description && <p>{task.description}</p>}
            <div className="flex gap-2 mt-1">
              <button className="edit-btn px-2 py-1 bg-blue-500 text-white rounded" onClick={() => setIsEditing(true)}>
                Sửa
              </button>
              <button className="delete-btn px-2 py-1 bg-red-500 text-white rounded" onClick={handleDelete}>
                Xóa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
