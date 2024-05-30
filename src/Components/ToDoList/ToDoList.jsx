import "./ToDoList.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTaskRedux, removeTaskRedux, updateTaskRedux } from "../../features/taskSlice";

import NewToDoForm from "../NewToDoForm/NewToDoForm";
import TodoListItem from "../ToDoListItem/TodoListItem";




const TodoList = () => {
  const tasksRedux = useSelector((state) => state.task.value);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([tasksRedux]);
  const [filter, setFilter] = useState('all');


  // Fetch tasks from Redux store on component mount
  useEffect(() => {
    setTasks(tasksRedux);
  }, [tasksRedux]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const createTask = (taskObj) => {
    dispatch(createTaskRedux(taskObj));
  };

  const handleRemoveTask = (indexToRemove) => {
    dispatch(removeTaskRedux(indexToRemove));
  };

  const handleCompleteTask = (index) => {
    // Toggle the completion status of the task
    const updatedCompleted = !tasks[index].completed;
    const taskId = index;
    
    console.log("Task ID:", index); // Log the taskId
    console.log("tasks[index]:", tasks[index]); // Log the taskId
  
    dispatch(
      updateTaskRedux({
        index: index,
        taskToBeUpdate: { completed: updatedCompleted }
      })
    );
  };
  


  return (
    <div >
      <input
        type="radio"
        id="all"
        name="filter"
        value="all"
        checked={filter==='all'}
        onChange={handleFilterChange}
      />
      <label htmlFor='all'>All Tasks</label>


      <input 
        type="radio"
        id="completed"
        name="filter"
        value="completed"
        checked={filter==='completed'}
        onChange={handleFilterChange}
      />
      <label htmlFor='completed'> Complted Tasks</label>
      
      <input 
        type="radio"
        id="active"
        name="filter"
        value="active"
        checked={filter==='active'}
        onChange={handleFilterChange}
      />
      <label htmlFor="active">Active Tasks</label>

      <NewToDoForm createTask={createTask} />
      {tasks
      .filter((task) => {
        if(filter === 'completed'){ return task.completed}
        else if (filter === 'active') {return !task.completed}
        else {return true;}
      })
      
      .map((taskItem, index) => (
        <TodoListItem
          key={index} // Ensure each item has a unique key
          index={index}
          todoObj={taskItem}
          removeTask={() => handleRemoveTask(index)}
          completeTask={() => handleCompleteTask(index)}
        />
      ))}
    </div>
  );
};

export default TodoList;

