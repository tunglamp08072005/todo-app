function taskReducer(tasks, action) {
  console.log("taskReducer");

  switch (action.type) {
    case "ADD_TASK":
      return [
        ...tasks,
        {
          title: action.title,
          description: action.description,
          completed: false
        }
      ];

    case "SET_TASK":
      return action.payload;

    case "REMOVE_TASK":
      return tasks.filter((_, index) => index !== action.id);

    case "MARK_DONE":
      return tasks.map((task, index) => {
        if (index === action.id) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      });

    default:
      throw new Error("Unknown Action Type: " + action.type);
  }
}

export default taskReducer;
