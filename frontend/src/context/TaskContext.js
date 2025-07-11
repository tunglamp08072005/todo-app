import { createContext } from "react";

// Tạo context để quản lý danh sách task và dispatch reducer
const TaskContext = createContext(null);

export default TaskContext;
