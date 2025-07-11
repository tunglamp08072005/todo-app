import React, { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import axios from "../../Axios/axios";
import "./Task.css";

function Task({ task, index }) {
  const { dispatch } = useContext(TaskContext);

  const handleToggle = async () => {
    try {
      await axios.patch(`/task/markDone/${task._id}`);
      dispatch({ type: "MARK_DONE", id: index });
    } catch (error) {
      console.error("Toggle Task Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/task/delete/${task._id}`);
      dispatch({ type: "REMOVE_TASK", id: index });
    } catch (error) {
      console.error("Delete Task Error:", error);
    }
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        <div className="task-info">
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}
        </div>
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        X
      </button>
    </div>
  );
}

export default Task;
