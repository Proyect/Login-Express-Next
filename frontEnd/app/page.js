  import { useState, useEffect } from "react";
  import { useRouter } from "next/router";
  import axios from "axios";
  import Link from "next/link";
  
  export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Auth System</h1>
        <p className="text-lg mb-4">Secure authentication with Next.js & Express.js</p>
        <div className="space-x-4">
          <Link href="/login">
            <a className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">Login</a>
          </Link>
          <Link href="/register">
            <a className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600">Register</a>
          </Link>
        </div>
      </div>
    );
  }
  
  export function Login() {
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
  
  export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("/api/register", { name, email, password });
        router.push("/login");
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
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded mb-3" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
        </form>
      </div>
    );
  }
  