import React from "react";
import CreateTask from "./createTask/CreateTask";
import TaskIndicator from "./TaskIndicator";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout-container max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Quản lý công việc</h1>
      <CreateTask />
      <TaskIndicator />
      <Outlet />
    </div>
  );
}

export default Layout;
