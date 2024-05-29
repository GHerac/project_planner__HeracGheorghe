import React, { useState, useEffect } from "react";
import "./TodoListItem.css";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { updateTaskRedux } from "../../features/taskSlice";
import { DisplaySelectedUsers } from "../TaskDetails/TaskDetails";
import { fetchUsers } from "../../features/users";

const TodoListItem = ({ todoObj, index, removeTask, completeTask}) => {
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editTaskPriority, setEditTaskPriority] = useState("");
  const [enableTaskAtributes, setEnableTaskAtributes] = useState(false);
  const [allUserList, setAllUserList] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([todoObj.assignedPersons]);
  const [addNewUser, setaddNewUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setAllUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount


  useEffect(() => {
    setSelectedUsers(selectedUsers);
  }, [selectedUsers]);


  const handleRemoveTask = () => {
    removeTask(index);
  };

  const handleCompletedTask = () => {
    completeTask(index);
  };

  const handleEditTask = (index) => {
    setEditMode(!editMode);
    setEnableTaskAtributes(!enableTaskAtributes);
  };

  // Dispatch the updateTaskRedux action with the index and taskUpdate payload
  const handleUpdateTask = (indexToUpdate, updatedTask) => {
    dispatch(
      updateTaskRedux({ index: indexToUpdate, taskUpdate: updatedTask })
    );
  };

  const handleSaveTask = () => {
    // Create a copy of the selectedUsers array to ensure immutability
    const updatedAssignedPersons = [...selectedUsers];

    // Create a taskUpdate object with the updated values
    const taskUpdate = {
      taskName: inputValue,
      descValue: descriptionValue,
      taskPriority: editTaskPriority,
      assignedPersons: updatedAssignedPersons,
      completed: false,
    };

    // Dispatch the updateTaskRedux action with the index and taskUpdate payload
    dispatch(updateTaskRedux({ index: index, taskToBeUpdate: taskUpdate }));

    // Exit edit mode
    setEditMode(false);
  };

  const handleaddNewUser = (event) => {
    const selectedUser = event.target.value;
    setaddNewUser(selectedUser);
  };

  const handleAssigneUser = () => {
    if (addNewUser) {
      // Only add the selected user if it's not already in the list
      if (!selectedUsers.includes(addNewUser)) {
        setSelectedUsers([...selectedUsers, addNewUser]);
      }
      setaddNewUser(""); // Clear the addNewUser input after adding to the list
    }
  };

  const handleRemoveUser = (index) => {
    const updatedUserList = selectedUsers.filter((user, i) => i !== index);
    setSelectedUsers(updatedUserList);
  };

  return (
    <div className="todo-item-container ">
      <div>
        <h4> Task name : {todoObj.taskName}</h4>
      </div>

      {/* <h3> {todoObj.descValue}</h3> */}
      {editMode ? (
        <>
          <input
            type="text"
            className="new-todo-input form-control g-2"
            value={inputValue !== "" ? inputValue : todoObj.taskName}
            placeholder={todoObj.taskName}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <textarea
            className="todo-item-description form-control"
            placeholder={todoObj.descValue}
            value={
              descriptionValue !== undefined
                ? descriptionValue
                : todoObj.descValue
            }
            onChange={(e) => setDescriptionValue(e.target.value)}
            rows="5"
          />
        </>
      ) : (
        <></>
      )}

      {/* Display task details */}

      {!editMode ? (
        <>
          <h6>
            priority of task{" "}
            {todoObj.taskPriority && todoObj.taskPriority.toString()}
          </h6>
          <h6>
            Start date of task{" "}
            {todoObj.timeline
              ? todoObj.timeline.startDate
                ? todoObj.timeline.startDate.toLocaleString()
                : "N/A"
              : "N/A"}
          </h6>
          <h6>
            End date of task{" "}
            {todoObj.timeline
              ? todoObj.timeline.endDate
                ? todoObj.timeline.endDate.toLocaleString()
                : "N/A"
              : "N/A"}
          </h6>
          <h5>Completed task : {todoObj.completed ? "yes" : "no"}</h5>
          <h5>List of USERS {todoObj.assignedPersons}</h5>
        </>
      ) : (
        <>
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={enableTaskAtributes}
              onChange={() => setEnableTaskAtributes(!enableTaskAtributes)}
            />
            Show Task Attributes
          </label>

          {enableTaskAtributes ? (
            <>
              <form className="my-1  h-50">
                <select
                  value={
                    editTaskPriority !== undefined
                      ? editTaskPriority
                      : todoObj.taskPriority
                  }
                  onChange={(e) => setEditTaskPriority(e.target.value)}
                  className="form-select w-100 h-75"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </form>

              <div className="d-flex justify-content-end row-cols-4">
                <span className=" align-self-center">Assigned Users</span>
                {/* <h3>Assigne users: {userList}</h3> */}
                <form className="my-3 w-50  align-self-center">
                  <select
                    value={addNewUser}
                    onChange={handleaddNewUser}
                    className="form-select w-75"
                  >
                    {allUserList.map((item) => (
                      <option key={item.id} value={item.firstName}>
                        {item.firstName}
                      </option>
                    ))}
                  </select>
                </form>

                <button
                  className="new-todo-button btn btn-outline-primary mt-3"
                  onClick={handleAssigneUser}
                >
                  Add User
                </button>
              </div>
              <DisplaySelectedUsers
                propsUserList={selectedUsers}
                action={handleRemoveUser}
              />
            </>
          ) : (
            <></>
          )}
        </>
      )}

      <div className="to-do-buttons-container">
        <button
          className="completed-button btn btn-outline-primary"
          style={{ backgroundColor: todoObj.completed ? "green" : "red" }}
          onClick={handleCompletedTask}
        >
          {todoObj.completed ? "Completed" : "Not Completed"}
        </button>

        <button
          className="remove-button btn btn-outline-primary"
          onClick={handleRemoveTask}
        >
          Remove Task
        </button>

        <button
          className="remove-button btn btn-outline-primary"
          onClick={editMode ? handleSaveTask : handleEditTask}
        >
          {" "}
          {editMode ? "Save task" : "Edit Task"}{" "}
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
