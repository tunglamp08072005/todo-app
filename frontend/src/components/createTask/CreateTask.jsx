import React, { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios";
import "./CreateTask.css";

function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return setError("Tiêu đề không được để trống");
    }

    try {
      const res = await axios.post("/task/create", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      dispatch({ type: "ADD_TASK", payload: res.data });
      setFormData({ title: "", description: "" });
      setError("");
    } catch (err) {
      console.error("Create Task Error:", err);
      setError("Tạo task thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="create-task-container">
      <form onSubmit={handleSubmit} className="create-task-form">
        <h2 className="text-xl font-bold mb-2">Tạo công việc mới</h2>

        {error && (
          <div className="text-red-600 font-medium mb-2">
            {error}
          </div>
        )}

        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Tiêu đề"
          onChange={handleChange}
          className="input-field"
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Mô tả (không bắt buộc)"
          onChange={handleChange}
          className="input-field"
        />

        <button
          type="submit"
          className="submit-button"
        >
          Thêm task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
