import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
  name: "task",
  initialState: {
    value: [],
  },
  reducers: {
    createTaskRedux: (state, action) => {

      state.value.push(action.payload);
    },
    
    removeTaskRedux: (state, action) => {

      state.value = state.value.filter((task, id) => id !== action.payload);
    },

    completTaskRedux: (state, action) => {

      console.log("am ajuns in completedTaskRedux");
      // const { taskId, completedVal } = action.payload;
      // // Find the index of the task with the specified taskId
      // const taskIndex = state.value.findIndex(task => task.id === taskId);
      
      // console.log('completedTaskRedux taskId',taskId);
      // console.log('completedTaskRedux completedVal',completedVal);

      // if (taskIndex !== -1) {
      //   // If the task exists, update its completion status
      //   state.value[taskIndex] = {
      //     ...state.value[taskIndex],
      //     completed: completedVal
      //   };
      // }
    },
    


    updateTaskRedux: (state, action) => {
      const { index, taskToBeUpdate } = action.payload;
    
      // Check if the index is valid
      if (index >= 0 && index < state.value.length) {
        // Update the task at the specified index
        state.value[index] = { ...state.value[index], ...taskToBeUpdate };
  
      } else {
        console.error("Invalid index provided for task update:", index);
      }
    },
    

    clearTasks: (state) => {
      state.value = [];
    }
    
    
  },
});

export const { createTaskRedux, removeTaskRedux, updateTaskRedux, completTaskRedux } = taskSlice.actions;

export default taskSlice.reducer;
