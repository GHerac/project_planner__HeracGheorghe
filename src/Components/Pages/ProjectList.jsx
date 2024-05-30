import { getCurrentDate } from "../../features/utility";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";

import { fetchUsers } from "../../features/users";

const Display = ({ value }) => {
  return (
    <table className='table table-primary table-striped table-responsive m-4'>
      <thead>
        <tr>
          <th>Index</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {value.map((item, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProjectList = () => {
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [userList, setUserList] = useState([]);

  const handleDateChange = (date) => {
    setEndDate(date);
    setSelectedDate(date.toDateString()); // Convert date to string
  };

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

  const today = getCurrentDate();
  let serializedDate = new Date().toISOString();
  let serializedSelectedDate  = endDate;
  // const dateObject = new Date(serializedSelectedDate);
  const dateString = serializedSelectedDate.toLocaleString();
  return (
    <>
      <h1>{today}</h1>
      <DatePicker
        wrapperClassName="datePicker"
        showIcon
        selected={endDate}
        onSelect={(date) => handleDateChange(date)}
        onChange={(date) => handleDateChange(date)}
      />
      <h3>Selected date: {selectedDate}</h3> {/* Display the selected date */}
      <h3>Current date: {serializedDate}</h3> {/* Display the selected date */}
      <h3>Selected serialized date: {dateString}</h3> {/* Display the selected date */}
      
      <Display value={userList} />
    </>
  );
};

export default ProjectList;
