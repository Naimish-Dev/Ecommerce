import { createSlice } from "@reduxjs/toolkit";



const UserSlice=createSlice({

name:"user",
initialState:{
    userdata:[],
    isFeatching:false,
    error:false,

},
reducers:{
    loginStart:(state)=>{
state.isFeatching = true
    },
    loginSucess:(state,action)=>{
        state.isFeatching=false;
        state.userdata = action.payload;
        state.error = false;
    },
    loginError:(state)=>{
        state.isFeatching = false;
       state.error=true;
    },
    logoutuser:(state)=>{
         state.userdata =null
    }
},


})


export const { loginStart, loginSucess, loginError,logoutuser } = UserSlice.actions;
export default UserSlice.reducer