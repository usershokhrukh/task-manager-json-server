import React, {useEffect} from "react";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import RenderTasks from "./RenderTasks";
import CreateTasks from "./CreateTasks";
import ShowDetail from "./ShowDetail";
import EditTask from "./EditTask";
import "../assets/dashboard.scss";
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(()=>{

    navigate("/")
  }, [])
  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <h2 className="dashboard__title">Tasks</h2>
        <button className="dashboard__c-button">Create Task</button>
      </div>
      <RenderTasks/>
      <main className="dashboard__main">
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/create" element={<CreateTasks />} />
          <Route path="/detail/:id" element={<ShowDetail />} />
          <Route path="/edit" element={<EditTask />} />
          <Route path="*" element={<h2 className="dashboard__not-found">Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
