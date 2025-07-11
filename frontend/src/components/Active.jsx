import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import Task from "./Task/Task";

function Active() {
  const { tasks } = useContext(TaskContext);

  // Lọc các task chưa hoàn thành
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="active-task-list p-4">
      <h2 className="text-xl font-semibold mb-4">Công việc đang hoạt động</h2>
      {activeTasks.length === 0 ? (
        <p className="text-gray-500">Không có công việc nào đang hoạt động.</p>
      ) : (
        activeTasks.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))
      )}
    </div>
  );
}

export default Active;
