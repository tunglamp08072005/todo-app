import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import Task from "./Task/Task";

function AllTask() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="all-task-list p-4">
      <h2 className="text-xl font-semibold mb-4">Tất cả công việc</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">Chưa có công việc nào được tạo.</p>
      ) : (
        tasks.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))
      )}
    </div>
  );
}

export default AllTask;
