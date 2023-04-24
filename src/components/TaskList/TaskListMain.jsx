import React, { useEffect, useState } from "react";
import "./TaskListMain.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TaskCard from "./TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loder";
import { useRef } from "react";
import Pagination from "@mui/material/Pagination";
// {
//   "explorer.confirmDelete": false,
//   "git.suggestSmartCommit": false,
//   "git.autofetch": true,
//   "emmet.includeLanguages": {
//       "javascript": "javascriptreact"
//   },
//   "explorer.confirmDragAndDrop": false,
//   "workbench.colorTheme": "Monokai",
//   "workbench.iconTheme": "eq-material-theme-icons"
// }
//redux
import { useDispatch, useSelector } from "react-redux";
import { setTaskData } from "../../Store/slice/TaskListSlice";
import { setUserInfo } from "../../Store/slice/TaskListSlice";
// import Pagination from "../Pagination/Pagination";
// import Test from '../AddTaskForm/test';
const TaskListMain = () => {
  const [loader, setLoader] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  let Storedata = useSelector((s) => s);
  let { deleteStatus } = Storedata.TaskManager;
  const tempFunction = useRef();

  const navgate = useNavigate();
  function handelAddTask() {
    navgate("../addTask");
  }

  function pageDataSlice(arr, pageNo) {
    let dataPerPage = 4;
    let fstIndx = (pageNo - 1) * dataPerPage;
    return arr.slice(fstIndx, fstIndx + dataPerPage);
  }

  async function getData() {
    if (Storedata.TaskManager.loginInfo.token === "") {
      navgate("../");
      return;
    }

    try {
      setLoader(true);
      const config = {
        headers: {
          authorization: Storedata.TaskManager.loginInfo.token,
        },
      };
      const res = await axios.get(
        `https://task-manager-gd9n.onrender.com/task`,
        config
      );
      // console.log(res.data.data);
      //pagination
      let data = [...res.data.data];
      let lengthh = parseInt(data.length / 4);
      if (lengthh !== data.length) lengthh = lengthh + 1;
      setTotalPages(lengthh);
      // redux
      dispatch(setTaskData(res.data.data.reverse()));
      let updateArr = pageDataSlice(data.reverse(), 1);
      setPageData(updateArr);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }
  tempFunction.current = getData;

  useEffect(() => {
    tempFunction.current();
  }, [deleteStatus]);

  return (
    <div>
      {loader ? <Loader /> : ""}
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>
      <nav>
        <div className="UserInformation">
          <p>Nmae:</p>
          <p>User email: {Storedata.TaskManager.loginInfo.email}</p>
        </div>
        {/* <Test/> */}
        <Stack direction="row" spacing={5}>
          <Button variant="contained" color="success" onClick={handelAddTask}>
            Add Task
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(setUserInfo({ email: "", token: "" }));
              navgate("../");
            }}
          >
            logout
          </Button>
        </Stack>
      </nav>
      <main className="mainLIST">
        {pageData?.map((item, indx) => {
          return <TaskCard data={item} key={indx * 55} />;
        })}
      </main>
      <Pagination
        count={totalPages}
        onChange={(e, v) => {
          //pagination
          let updateArr = pageDataSlice(Storedata.TaskManager.Tasks, v);
          setPageData(updateArr);
        }}
      />
    </div>
  );
};

export default TaskListMain;
