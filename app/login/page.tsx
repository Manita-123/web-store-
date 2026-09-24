"use client";

import Link from "next/link";
import {useEffect, useState} from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {

  const router = useRouter()

  const [btnDisabled, setBtnDisabled] = useState(false)
    const [loading , setLoading] = useState(false)

  const [user, setUser] = useState({
    email: "", password: ""
  })

  const onLogin = async () => {
    try{

      setLoading(true)
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login Successfully")
      router.push("/profile")

    } catch (err: any) {
      console.log("Login Failed" , err.message);
      toast.error(err.message)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setBtnDisabled(false)
    }
    else{
      setBtnDisabled(true)
    }

  }, [user])

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-7">{loading ? "Processing" : "Login"}</h1>

      
      <label htmlFor="email">Email</label>
      <input className="p-4 ml-6 text-black mb-4 border rounded border-amber-200 focus:outline-none focus:border-amber-600" type="email" id="email"  value={user.email} onChange={(e) => setUser({...user , email:e.target.value})} placeholder="Enter Email" />
      <br />
      <label htmlFor="password">Password</label>
      <input className="p-4 text-black ml-6 mb-4 border rounded border-amber-200 focus:outline-none focus:border-amber-600" type="password" id="password"  value={user.password} onChange={(e) => setUser({...user , password:e.target.value})} placeholder="Enter Password" />

      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{btnDisabled ? "No Login" : "Login"}</button>

      <Link href="/signup">Visit Signup</Link>
    </div>
  )
}
