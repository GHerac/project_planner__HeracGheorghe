import "./TaskDetails.css";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../features/users";
import { CustomDatePickerInput } from "../../features/custom";

const DisplaySelectedUsers = ({ propsUserList, action }) => {
  // if (!propsUserList || propsUserList.length === 0) {
  //   return <p>No users selected</p>;
  // }
  
  return (
    <table className="table table-primary table-striped table-responsive">
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {propsUserList.flat().map((user, index) => {
          console.log("User:", user); // Add console.log statement here
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{user}</td>
              <td>
                {/* Add action buttons or links for each user if needed */}
                <button
                  className="btn btn-danger"
                  onClick={() => action(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TaskDetails = ({
  taskPriority,
  setTaskPriority,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  usersAssigned,
  setUsersAssigned,
  clearSelectedUser,
}) => {
  const [userList, setUserList] = useState([]); // state for entire list of users
  const [selectUser, setSelectUser] = useState(""); // state for curent user selected
  const [selectedUserList, setSelectedUserList] = useState([]); // list of assigned users for a task

  // useEfect to populate userList
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  const handleChangePriority = (event) => {
    const value = event.target.value;
    setTaskPriority(value);
  };

  const handleSelectUser = (event) => {
    const selectedUser = event.target.value;
    setSelectUser(selectedUser);
  };

  const handleAssigneUser = () => {
    if (selectUser) {
      // Only add the selected user if it's not already in the list
      if (!selectedUserList.includes(selectUser)) {
        setSelectedUserList([...selectedUserList, selectUser]);
      }
      setSelectUser(""); // Clear the selectUser input after adding to the list
    }
  };

  useEffect(() => {
    setUsersAssigned(selectedUserList);
  }, [selectedUserList]);

   useEffect(() => {
    setSelectedUserList([]);
   }, [clearSelectedUser] )
  const handleRemoveUser = (index) => {
    // Filter out the user at the specified index
    const updatedUserList = selectedUserList.filter((user, i) => i !== index);
    // Update the state with the filtered user list
    setSelectedUserList(updatedUserList);
  };

  const handleAtrbStartDate = (date) => {
    const startDateISOstring = date.toISOString();
    setStartDate(startDateISOstring);
  };

  const handleAtrbEndDate = (date) => {
    const endDateISOstring = date.toISOString();
    setEndDate(endDateISOstring);
  };

  return (
    <div className="container container-task-description border border-primary ">
      <div className="row g-3 border border-info m-3 rounded ">
        <div className="col-md-6 d-flex align-items-center">
          <h6>Select priority of task:</h6>

          <form className="my-1 ms-2 w-100">
            <select
              value={taskPriority}
              onChange={handleChangePriority}
              className="form-select w-100 h-75"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </form>
        </div>

        <div className="col-md-6">
          <div className="d-flex flex-column ">
            <div className="border border-primary mb-2 ">
              <span className="float-start">Start Date</span>
              <DatePicker
                className="custom-datepicker"
                selected={startDate}
                onSelect={(date) => handleAtrbStartDate(date)}
                onChange={(date) => handleAtrbStartDate(date)}
                customInput={<CustomDatePickerInput />}
              />
            </div>
            <div className="border border-primary rounded">
              <span>End Date</span>
              <DatePicker
                className="custom-datepicker"
                selected={endDate}
                onSelect={(date) => handleAtrbEndDate(date)}
                onChange={(date) => handleAtrbEndDate(date)}
                customInput={<CustomDatePickerInput />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end row-cols-4">
        <span className=" align-self-center">Assigned Users</span>
        {/* <h3>Assigne users: {userList}</h3> */}
        <form className="my-3 w-50  align-self-center">
          <select
            value={usersAssigned}
            onChange={handleSelectUser}
            className="form-select w-75  "
          >
            {userList.map((item) => (
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

      <h5>SELECTED USER </h5>
      <h6>{JSON.stringify(selectedUserList)}</h6>
      <DisplaySelectedUsers
        propsUserList={selectedUserList}
        action={handleRemoveUser}
      />
     
    </div>
  );
};

export { DisplaySelectedUsers };
export default TaskDetails;
