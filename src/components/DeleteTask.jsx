import React from "react";
import "../assets/delete-task.scss";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
const DeleteTask = ({setData}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const controller = new AbortController();
  let waiting = true;
  const handleDelete = () => {
    try {
      waiting = false;
      setTimeout(() => {
        if (!waiting) {
          toast.error("Request timed out");
          navigate("/");
          controller.abort();
          waiting = true;
        }
      }, 3000);
      axios
        .delete(`http://localhost:3000/tasks/${id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          toast.warn("You deleted task!");
          navigate("/");
          waiting = true;
          getTasks();
        })
        .catch((err) => {
          toast.error("Something went wrong");
          throw new Error(err);
        });
    } catch (err) {
      toast.error("Something went wrong");
      throw new Error(err);
    }
  };

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
  return (
    <div className="delete-task">
      <div className="delete-task__main">
        <h2 className="delete-task__title">
          Please confirm to delete that task
        </h2>
        <div className="delete-task__box">
          <button
            onClick={() => {
              toast.success("You saved task!");
              navigate("/");
            }}
            className="delete-task__button delete-task__button-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="delete-task__button delete-task__button-yes"
          >
            I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
