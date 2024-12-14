import api from "./api";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { userinfoActions } from "./store/store";
import HomePage from "./compuntes/Home";
import { useEffect } from "react";
import Userpage from "./compuntes/Userpage";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const id = state.userinfo.id
  useEffect(() => {
    api.get(`api/userprofile/${id}/`)
    .then(res => {
      dispatch(userinfoActions.userdata(res.data))
    })
    
  },[])
  
  return (
    <>
      
      {state.userinfo.islogin ? (
        <>
        
        <a href="/feed">Go to page</a>
        </>
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;
