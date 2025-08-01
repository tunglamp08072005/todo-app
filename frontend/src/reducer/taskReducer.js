function taskReducer(tasks, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...tasks, { ...action.payload, completed: false }];

    case "SET_TASK":
      return action.payload;

    case "REMOVE_TASK":
      return tasks.filter((task) => task._id !== action.id);

    case "MARK_DONE":
      return tasks.map((task) =>
        task._id === action.id ? { ...task, completed: !task.completed } : task
      );

    case "UPDATE_TASK":
      return tasks.map((t) => (t._id === action.task._id ? action.task : t));

    default:
      throw new Error("Unknown Action Type: " + action.type);
  }
}

export default taskReducer;
