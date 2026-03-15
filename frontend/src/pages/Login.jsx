import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const login = async(e)=>{
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:3000/api/login",
        {username,password},
        {withCredentials:true}
      );

      Cookies.set("token",res.data.token);

      navigate("/");

    }catch(err){
      alert("Login gagal");
    }
  };

  return(

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={login}
        className="bg-white p-8 shadow-lg rounded-lg w-80"
      >

        <h1 className="text-xl font-bold mb-4">
          Login
        </h1>

        <input
          placeholder="username"
          className="border p-2 w-full mb-2"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-indigo-600 text-white w-full p-2 rounded">
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;