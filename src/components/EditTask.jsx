import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const EditTask = ({setData}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [data, setTasksData] = useState({
    id: "",
    status: "pending",
    title: "",
    description: "",
    dueDate: "pending",
  });
  const controller = new AbortController();
  let waiting = true;
  useEffect(() => {
    try {
      waiting = false;
      setTimeout(() => {
        if (!waiting) {
          setTasksData({...data, dueDate: "canceled"});
          controller.abort();
          waiting = true;
        }
      }, 3000);
      axios
        .get(`http://localhost:3000/tasks/${id}`, {
          signal: controller.signal,
        })
        .then((response) => {
          setTimeout(() => {
            setTasksData(response?.data);
            waiting = true;
          }, 1000);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      toast.error("Couldn't get task");
      throw new Error(error);
    }
  }, []);

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
      axios
        .put(`http://localhost:3000/tasks/${data.id}`, data)
        .then((res) => {
          toast.success("Task updated successfully soon!");
          getTasks();
          navigate("/");
        })
        .catch((err) => {
          toast.error("Something went wrong");
          throw new Error(err);
        });
    } else {
      toast.error("Please fill all the fields");
    }
  };
  const canceledF = () => {    
    toast.error("Couldn't get task");
    setTasksData({...data, dueDate:"pending"})
    navigate("/");
  };
  return (
    <div className="create-tasks">
      {data?.dueDate == "pending" ? (
        <form
          onSubmit={handleSubmit}
          className=" create-tasks__loader-form create-tasks__form"
        >
          <input
            className=" create-tasks__loader-input create-tasks__input"
            type="text"
            placeholder="Title"
          />
          <textarea
            className=" create-tasks__loader-textarea create-tasks__textarea"
            placeholder="Description"
          ></textarea>
          <input
            className=" create-tasks__loader-input create-tasks__input"
            type="date"
            placeholder="Due Date"
          />
          <div className="create-tasks__buttons">
            <button
              className=" create-tasks__loader-button create-tasks__button"
              type="submit"
            >
              Edit Task
            </button>
            <button
              className=" create-tasks__loader-button create-tasks__button"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : data?.dueDate == "canceled" ? (
        canceledF()
      ) : (
        <form onSubmit={handleSubmit} className="create-tasks__form">
          <input
            onChange={(e) => {
              setTasksData({...data, title: e.target.value});
            }}
            value={data?.title}
            className="create-tasks__input"
            type="text"
            placeholder="Title"
          />
          <textarea
            onChange={(e) => {
              setTasksData({...data, description: e.target.value});
            }}
            value={data?.description}
            className="create-tasks__textarea"
            placeholder="Description"
          ></textarea>
          <input
            value={data?.dueDate}
            onChange={(e) => {
              setTasksData({...data, dueDate: e.target.value});
            }}
            className="create-tasks__input"
            type="date"
            placeholder="Due Date"
          />
          <div className="create-tasks__buttons">
            <button className="create-tasks__button" type="submit">
                Edit Task
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="create-tasks__button"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditTask;
