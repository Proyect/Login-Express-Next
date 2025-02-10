'use client';
  
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
  
 
  
 
  