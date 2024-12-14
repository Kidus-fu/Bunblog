import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router';
import api from "../api"

import { userinfoActions } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isloding,setIsloding] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const id = state.userinfo.id
  const userdatafuch = () => {
      api.get(`api/userprofile/${id}/`)
      .then(res => {
        dispatch(userinfoActions.userdata(res.data))
        return true
      })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloding(true)
    api 
    .post("http://localhost:8000/api/token/",{username:username,password:password})
    .then(resp => {
      if (resp.statusText === "OK") {
        localStorage.setItem("access_token",resp.data.access)
        dispatch(userinfoActions.login());
        navigate("/")
        setIsloding(false)
        return resp.data
      }else{
        return resp
      }
    }).catch(error => {
      setIsloding(false)
      setError("You'r Username Or Password Is incorect! Try agen")
    })
    
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100 " >
      <div className={`w-full max-w-sm p-6 bg-white rounded-lg shadow-lg ${isloding? "pointer-events-none":""}`}>
        <div className="text-center">
          <a href="/">
          <img
            src="https://th.bing.com/th/id/R.283c1ca1b7db46617327cde50b2dcfbd?rik=Z7BUVWHh2nnnCw&pid=ImgRaw&r=0"
            alt="Loading"
            className="w-12 mx-auto"
          />
          <h1 className="text-5xl font-bold mt-4">BunaBlog</h1>
          </a>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {/* loding */}
        {isloding ? <div className="absolute flex ms-20  justify-center items-center mt-5 mb-5">
          <div className="bg-black rounded-full animate-ping h-10 w-10 m-2"></div>
            <div className="bg-black rounded-full animate-ping h-10 w-10 m-2"></div>
            <div className="bg-black rounded-full animate-ping h-10 w-10 m-2"></div>
          </div>:""}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              username
            </label>
            <input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
          <p>If you don't have an account <Link to={"/signup"}
          className='text-yellow-700 underline'
          >Sing Up</Link></p> 
          
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
