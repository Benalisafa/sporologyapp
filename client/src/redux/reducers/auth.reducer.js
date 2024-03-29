import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
    name:"auth",
    initialState:{
        isConnected: false,
        user:{},
        token:null,
    },
    reducers:{
        login:(state,action)=>{
            state.isConnected = true;
            state.user = action.payload.user;
            state.token = action.payload.token;


        },

        logout:(state)=>{
            state.isConnected = false;
            state.user={};
            state.token=null;
        },
    },
})
export const {login,logout} =authReducer.actions;
