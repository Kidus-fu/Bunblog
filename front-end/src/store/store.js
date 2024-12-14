import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../config';
import { jwtDecode } from "jwt-decode";


let isloginnow ;
let token ;
let decoded;
let id = null
if (localStorage.getItem(ACCESS_TOKEN)){
  isloginnow = true
  token = localStorage.getItem(ACCESS_TOKEN)
  decoded = jwtDecode(token)
  id = decoded.user_id
}else{
  isloginnow = false
}
let Dark;
if (localStorage.getItem("Dark")) {
  Dark = JSON.parse(localStorage.getItem("Dark")); // Parse the string value
} else {
  Dark = false; // Default to false
  localStorage.setItem("Dark", JSON.stringify(Dark)); // Save the default value
}
/**
 */
const userinfo = createSlice({
  name: "userinfo",
  initialState: { islogin: isloginnow,id: id,userinfoobj:{},IsDark:Dark,users:[]},
  reducers: {
    login(state) {
      state.islogin = true; 
    },
    logout(state) {
      if (localStorage.getItem(ACCESS_TOKEN)){
        localStorage.removeItem(ACCESS_TOKEN)
      }
      state.userinfoobj = {}
      state.islogin = false; 
    },
    userdata(state, action) {
      
        state.userinfoobj = action.payload;  
        state.islogin = true;
  },
    usersdata(state, action) {
        state.users = action.payload;  
  },
  toggleDarkMode(state) {
    const newDarkMode = !state.IsDark;
    state.IsDark = newDarkMode;
    localStorage.setItem("Dark", JSON.stringify(newDarkMode));
  }
    
  }
});

const data = createSlice({
  name: "data",
  initialState: { resute: [1, 1, 1] },
  reducers: {
    getdata(state, action) {
      state.resute = action.payload;  
    }
  }
});

export const userinfoActions = userinfo.actions;
export const dataActions = data.actions;

const store = configureStore({
  reducer: {
    userinfo: userinfo.reducer,
    data: data.reducer
  }
});

export default store;
