import axios from "axios";
import React, {useEffect, useState} from "react";
import {useFetcher, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const ShowDetail = () => {
  const {id} = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/tasks/${id}`)
        .then((response) => {
          setData(response?.data);
        })
        .catch((error) => {
          toast.error(error);
          throw new Error(error);
        });
    } catch (error) {
      toast.error(error);
      throw new Error(error);
    }
  }, []);

  return (
    <div className="dashboard__detail-box">
      <div className="tasks__item">
        <div className="tasks__item-top-m">
          <div className="tasks__item-top">
            <p className="tasks__item-tid">{data?.id}</p>
            <p className="tasks__item-title">{data?.title}</p>
          </div>
        </div>
        <h4 className="tasks__item-main">{data?.description}</h4>
        <div className="tasks__item-top tasks__item-bot">
          <p className="tasks__item-date">{data?.dueDate}</p>
          <p className="tasks__item-tpen">{data?.status}</p>
        </div>
        <button onClick={() => {navigate("/")}} className="tasks__close">Close</button>
      </div>
    </div>
  );
};

export default ShowDetail;
