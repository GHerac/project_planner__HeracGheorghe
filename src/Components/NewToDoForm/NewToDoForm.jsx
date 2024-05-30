import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskRedux } from "../../features/taskSlice";

import "./NewToDoForm.css";
import "react-datepicker/dist/react-datepicker.css";
import TaskDetails from "../TaskDetails/TaskDetails";

const NewToDoForm = ({ createTask }) => {
  // states for fields
  const [inputValue, setInputValue] = useState(""); // state for taskName
  const [descriptionValue, setDescriptionValue] = useState(""); // state for descriptionTask

  const [taskPriority, setTaskPriority] = useState(""); // state for priority of task
  const [currentuserAssigned, setcurrentuserAssigned] = useState(""); // state for assigned Users
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //Flags
  const [addDescription, setaddDescription] = useState(false); // state for checkbox to add description of the task
  const [enableTaskAtributes, setEnableTaskAtributes] = useState(false); // state for checkbox to add more attributes of  a task
  const [createdTask, setcreatedTask] = useState(false);
  const dispatch = useDispatch();

  const onTaskNameChange = (e) => {
    const newValue = e.target.value;
    // Check if the new value is different from the current inputValue
    if (newValue !== inputValue) {
      setInputValue(newValue); // Update inputValue if the new value is different
    }
  };

  const onDescriptionChanged = (e) => setDescriptionValue(e.target.value);

  const handleCreateTask = () => {
    if (inputValue.trim() !== "") {
      // Check if currentuserAssigned is defined before accessing its properties
      // const assignedPersons = currentuserAssigned?.assignedPersons || [];
      const assignedPersons = currentuserAssigned;

      // Create the task object
      const newTask = {
        taskName: inputValue,
        descValue: descriptionValue,
        taskPriority: taskPriority,
        assignedPersons: assignedPersons,
        timeline: { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
        
      };

      // Dispatch the createTaskRedux action with the new task object
      dispatch(createTaskRedux(newTask));

      // Reset inputValue and descriptionValue after creating task
      setInputValue("");
      setDescriptionValue("");
      setcreatedTask(true);
      
    }
  };

  return (
    <div className="container new-todo-form gradient">
      <h3>Create New ToDo item </h3>
      {/* input form for task name */}
      <div className="row">
        <div className="col-8 d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="new-todo-input form-control"
            placeholder="Type your new task name here"
            value={inputValue}
            onChange={onTaskNameChange}
          />
        </div>
        <div className="col-4 justify-content-center align-items-center">
          <div className="input-group">
            {" "}
            {/* Use input-group wrapper */}
            <button
              className="btn btn-outline-primary mt-1 w-100 h-100"
              onClick={handleCreateTask}
            >
              Create ToDo
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* checkbox for add description of a task or todo item */}
        <label className="form-check-label m-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={addDescription}
            onChange={() => setaddDescription(!addDescription)}
          />
          Show Description
        </label>

        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            checked={enableTaskAtributes}
            onChange={() => setEnableTaskAtributes(!enableTaskAtributes)}
          />
          Show Task Attributes
        </label>
      </div>

      {/* checkbox for add more details of task */}
      {addDescription && (
        <textarea
          className="todo-item-description form-control"
          placeholder="Type your description here"
          rows="5"
          value={descriptionValue}
          onChange={onDescriptionChanged}
        />
      )}

      {enableTaskAtributes ? (
        <TaskDetails
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          usersAssigned={currentuserAssigned}
          setUsersAssigned={setcurrentuserAssigned}
          clearSelectedUser={createdTask}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewToDoForm;
