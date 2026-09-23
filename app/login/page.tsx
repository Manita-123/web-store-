"use client";

import Link from "next/link";
import React from "react"
import { useRouter } from "next/navigation";
import {axios} from "axios";



export default function LoginPage() {

  const [user, setUser] = React.useState({
    email: "", password: ""
  })

  const onLogin = async () => {
  }

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-7">Login</h1>

      
      <label htmlFor="email">Email</label>
      <input className="p-4 ml-6 mb-4 border rounded border-amber-200 focus:outline-none focus:border-amber-600" type="email" id="email"  value={user.email} onChange={(e) => setUser({...user , email:e.target.value})} placeholder="Enter Email" />
      <br />
      <label htmlFor="password">Password</label>
      <input className="p-4 ml-6 mb-4 border rounded border-amber-200 focus:outline-none focus:border-amber-600" type="password" id="password"  value={user.password} onChange={(e) => setUser({...user , password:e.target.value})} placeholder="Enter Password" />

      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>

      <Link href="/signup">Visit Signup</Link>
    </div>
  )
}
