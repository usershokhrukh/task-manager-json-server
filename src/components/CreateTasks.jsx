import React, { useState } from "react";
import "../assets/create-tasks.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const CreateTasks = ({setData, tasksData}) => {
  const navigate = useNavigate()
  const [data, setTasksData] = useState({
    id: "",
    status: "pending",
    title: "",
    description: "",
    dueDate: "",
  });
  const getTasks = () => {
    try {
      axios
        .get("http://localhost:3000/tasks")
        .then((response) => {
          setTimeout(() => {
            setData(response?.data);
          }, 1000);
        })
        .catch((error) => {
          toast.error("Couldn't get tasks");
          throw new Error(error);
        });
    } catch (error) {
      toast.error("Couldn't get tasks");
      throw new Error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.title && data.description && data.dueDate) {
      axios.post("http://localhost:3000/tasks", data)
        .then((res) => {
          getTasks();
          toast.success("Task created successfully");
          navigate("/")
        })
        .catch((err) => {
          toast.error("Something went wrong");
          throw new Error(err);
        });
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <div className="create-tasks">
      <form onSubmit={handleSubmit} className="create-tasks__form">
        <input
        onChange={(e) => {
          setTasksData({...data, title: e.target.value})
        }}
          className="create-tasks__input"
          type="text"
          placeholder="Title"
        />
        <textarea
        onChange={(e) => {
          setTasksData({...data, description: e.target.value})
        }}
          className="create-tasks__textarea"
          placeholder="Description"
        ></textarea>
        <input
        onChange={(e) => {
          setTasksData({...data, dueDate: e.target.value})
        }}
          className="create-tasks__input"
          type="date"
          placeholder="Due Date"
        />
        <div className="create-tasks__buttons">
          <button className="create-tasks__button" type="submit">
            Create Task
          </button>
          <button onClick={() => {navigate("/")}} className="create-tasks__button" type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTasks;
