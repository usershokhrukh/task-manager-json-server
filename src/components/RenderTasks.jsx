import React, {useEffect, useState} from "react";
import "../assets/tasks.scss";
import {toast} from "react-toastify";
import axios from "axios";
import RenderTaskGetData from "./RenderTaskGetData";
const RenderTasks = () => {
  const [data, setData] = useState({});
  useEffect(() => {
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
  }, []);

  return (
    <div className="tasks">
      {data.length ? (
        <RenderTaskGetData tasks={data} />
      ) : (
        <p className="dashboard__load">Loading...</p>
      )}
    </div>
  );
};

export default RenderTasks;
