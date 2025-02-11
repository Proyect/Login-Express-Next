'use client';

import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/api/login", { email, password });
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
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
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded mb-3" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      </div>
    );
  }
  