import React, { useContext, useState } from "react";
import TaskContext from "../context/TaskContext";
import CompletedTask from "./CompletedTask";

function Completed() {
  const { tasks } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState("");

  const completedTasks = tasks.filter(task => task.completed);

  // Lọc thêm theo từ khóa tìm kiếm
  const filteredTasks = completedTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="completed-task-list p-4">
      <h2 className="text-xl font-semibold mb-4">Công việc đã hoàn thành</h2>

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm công việc..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">Không tìm thấy công việc nào phù hợp.</p>
      ) : (
        filteredTasks.map((task, index) => (
          <CompletedTask key={task._id} task={task} index={index} />
        ))
      )}
    </div>
  );
}

export default Completed;
