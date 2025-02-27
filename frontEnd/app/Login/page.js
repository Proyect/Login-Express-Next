'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://127.0.0.1:5000/api/login", { email, password });
        localStorage.setItem("token", res.data.token);
        router.push("/");
        alert("Correct Login");
      } catch (err) {
        alert("Login failed");
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="w-full max-w-md bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded mb-3" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            Required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded mb-3" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            Required 
          />
          <button type="submit" className="btn btn-outline-primary rounded">Login</button>
        </form>
      </div>
    );
  }
  