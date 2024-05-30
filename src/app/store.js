import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({

    reducer:{
        create: createtodoReducer
    },
})