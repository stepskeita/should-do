import React, { Fragment, useState, useContext, useEffect } from "react";
import AddTaskForm from "../form/AddTaskForm";
import TaskContext from "../../context/taskContext";
import { v4 as uuidv4 } from "uuid";
const AddTask = () => {
  const taskContext = useContext(TaskContext);
  const { createTask, toEdit, editTask, clearEdit } = taskContext;

  const [task, setTask] = useState({
    task_name: "",
    day: "today",
    time: "",
  });

  useEffect(() => {
    if (toEdit) {
      setTask(toEdit);
    }
  }, [taskContext, toEdit]);

  const addTask = () => {
    const data = {
      id: uuidv4(),
      ...task,
      status: "undone",
      current_date: new Date(),
    };

    createTask(data);

    resetStates();
  };

  const changeTask = () => {
    editTask(task);
    clearEdit();
    resetStates();
  };

  const clearAll = () => {
    clearEdit();
    resetStates();
  };

  const resetStates = () => {
    setTask({
      time: "",
      task_name: "",
      day: "today",
    });
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <div className="fixed-action-btn">
        <a
          href="#!"
          className="btn-floating btn-large waves-effect waves-light teal darken-4 tooltipped modal-trigger"
          data-target="add-task"
          data-position="top"
          data-tooltip="Create Task"
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
      <div id="add-task" className="modal">
        <div className="modal-content">
          <h4 className="center">Add a To-DO</h4>
          <div className="row">
            <AddTaskForm task={task} handleChange={handleChange} />
            <div className="col s12">
              <a
                href="#!"
                className="modal-close waves-effect waves-green btn-flat teal darken-4 white-text modal-submit"
                onClick={toEdit ? changeTask : addTask}
              >
                {toEdit ? "Update" : "Add"}
              </a>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat red white-text modal-btn"
            onClick={clearAll}
          >
            Close
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTask;
