import React, {useEffect, useState} from "react";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
// import RenderTasks from "./RenderTasks";
import CreateTasks from "./CreateTasks";
import ShowDetail from "./ShowDetail";
import EditTask from "./EditTask";
import "../assets/dashboard.scss";
import axios from "axios";
import {toast} from "react-toastify";
import RenderTaskGetData from "./RenderTaskGetData";
import DeleteTask from "./DeleteTask";
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

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
    <div className="dashboard">
      <div className="dashboard__top">
        <h2 className="dashboard__title">Tasks</h2>
        <button
          onClick={() => {
            navigate("/create");
          }}
          className="dashboard__c-button"
        >
          Create Task
        </button>
      </div>
      {/* <RenderTasks /> */}
      <div className="tasks">
        {data.length ? (
          <RenderTaskGetData tasks={data} />
        ) : (
          <p className="dashboard__load">Loading...</p>
        )}
      </div>

      <main className="dashboard__main">
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/create" element={<CreateTasks setData={setData} />} />
          <Route path="/detail/:id" element={<ShowDetail />} />
          <Route path="/edit/:id" element={<EditTask setData={setData} />} />
          <Route path="/delete/:id" element={<DeleteTask setData={setData} />} />
          <Route
            path="*"
            element={<h2 className="dashboard__not-found">Not Found</h2>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
