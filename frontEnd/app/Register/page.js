'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/register", { name, email, password });
      router.push("/Login");
      alert("Registracion Done!!!")
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="w-full max-w-md bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full p-2 border rounded mb-3" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
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
        <button type="submit" className="btn btn-outline-primary rounded">Register</button>
      </form>
    </div>
  );
}