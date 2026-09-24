"use client";

import Link from "next/link";
import React, { useEffect , useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {

  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "", password: "", username: ""
  })

  const [btnDisabled, setBtnDisabled] = useState(false)
  const [loading , setLoading] = useState(false)

  const onSignup = async () => {
    try{
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Sucessfully", response.data);
      router.push("/login");
      
    } catch (err: any){
      console.log("signup failed",err.message);
      
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setBtnDisabled(false)
    }
    else{
      setBtnDisabled(true)
    }

  }, [user])

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-7">{loading ? "Processing" : "SignUp"}</h1>

      <label htmlFor="username">Username</label>
      <input className="p-4 ml-6 mb-4 border rounded border-amber-200 text-black focus:outline-none focus:border-amber-600" type="text" id="username"  value={user.username} onChange={(e) => setUser({...user , username:e.target.value})} placeholder="Enter Username" />
      <br />
      <label htmlFor="email">Email</label>
      <input className="p-4 ml-6 mb-4 border rounded border-amber-200 text-black focus:outline-none focus:border-amber-600" type="email" id="email"  value={user.email} onChange={(e) => setUser({...user , email:e.target.value})} placeholder="Enter Email" />
      <br />
      <label htmlFor="password">Password</label>
      <input className="p-4 ml-6 mb-4 border rounded border-amber-200 text-black focus:outline-none focus:border-amber-600" type="password" id="password"  value={user.password} onChange={(e) => setUser({...user , password:e.target.value})} placeholder="Enter Password" />

      <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{btnDisabled ? "No Signup" : "SignUp Here"}</button>

      <Link href="/login">Visit Login</Link>
    </div>
  )
}
