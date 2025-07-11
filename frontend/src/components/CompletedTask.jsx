import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import axios from "../Axios/axios";

function CompletedTask({ task, index }) {
  const { dispatch } = useContext(TaskContext);

  const handleToggleComplete = async () => {
    try {
      await axios.patch(`/task/markDone/${task._id}`);
      dispatch({ type: "MARK_DONE", id: index });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/task/delete/${task._id}`);
      dispatch({ type: "REMOVE_TASK", id: index });
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
    }
  };

  return (
    <div className="completed-task border p-3 rounded mb-3 bg-green-100 shadow-md">
      <h3 className="font-bold text-green-800 line-through">{task.title}</h3>
      {task.description && <p className="text-green-700 line-through">{task.description}</p>}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleToggleComplete}
          className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
        >
          Bỏ hoàn thành
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default CompletedTask;
