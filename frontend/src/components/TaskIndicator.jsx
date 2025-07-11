import React from "react";
import { NavLink } from "react-router-dom";

function TaskIndicator() {
  const activeStyle = "text-white bg-blue-500";
  const baseStyle =
    "px-4 py-2 rounded text-sm font-semibold transition duration-200";

  return (
    <nav className="task-indicator my-4 flex justify-center gap-3">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : "bg-gray-200 text-gray-700"}`
        }
      >
        Tất cả
      </NavLink>
      <NavLink
        to="/active"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : "bg-gray-200 text-gray-700"}`
        }
      >
        Đang làm
      </NavLink>
      <NavLink
        to="/completed"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : "bg-gray-200 text-gray-700"}`
        }
      >
        Đã xong
      </NavLink>
    </nav>
  );
}

export default TaskIndicator;
