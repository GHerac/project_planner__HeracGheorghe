import React from 'react';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { RouterProvider, createBrowserRouter } from 'react-router5'; // Assuming you're using react-router5

import Main from './Components/Pages/Main';
import Homepage from './Components/Pages/Homepage';
import ProjectList from './Components/Pages/ProjectList';
import TaskList from './Components/Pages/TaskList';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Main>
        <Homepage />
      </Main>
    )
  },
  {
    path: '/projectlist',
    element: (
      <Main>
        <ProjectList />
      </Main>
    )
  },
  {
    path: '/tasklist',
    element: (
      <Main>
        <TaskList />
      </Main>
    )
  }
]);

function App() {
  return (
    
      <div className="App-container">
        <RouterProvider router={router} />
        {/* <TodoList /> */}
      </div>
    
  );
}

export default App;
