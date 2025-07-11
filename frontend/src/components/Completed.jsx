import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import CompletedTask from "./CompletedTask";

function Completed() {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="completed-task-list p-4">
      <h2 className="text-xl font-semibold mb-4">Công việc đã hoàn thành</h2>
      {completedTasks.length === 0 ? (
        <p className="text-gray-500">Chưa có công việc nào hoàn thành.</p>
      ) : (
        completedTasks.map((task, index) => (
          <CompletedTask key={task._id} task={task} index={index} />
        ))
      )}
    </div>
  );
}

export default Completed;
