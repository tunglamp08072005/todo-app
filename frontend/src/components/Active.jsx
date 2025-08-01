import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import Task from "./Task/Task";

function Active() {
  const { tasks } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc các task chưa hoàn thành
  const activeTasks = tasks.filter((task) => !task.completed);

  // Lọc theo tìm kiếm
  const filteredTasks = activeTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="active-task-list p-4">
      <h2 className="text-xl font-semibold mb-4">Công việc đang hoạt động</h2>

      <input
        type="text"
        placeholder="🔍 Tìm kiếm công việc..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">Không có công việc nào phù hợp.</p>
      ) : (
        filteredTasks.map((task) => (
          <Task key={task._id} task={task} />
        ))
      )}
    </div>
  );
}

export default Active;
