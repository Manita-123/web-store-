"use client"

import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"



export default function ProfilePage() {

  const router = useRouter();

  const logout = async () => {
  try{
    await axios.get('/api/users/logout')
    toast.success('Logout Sucessfully')
    router.push('/login')
  } catch(err:any){
    console.log(err.message);
    toast.error(err.message)
  }
}

const getUserDetails = async () => {
  const res = axios.get('api/users/me')
  console.log(res.data);
  
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='text-xl'>Profile</h1>
      <hr />
      <p className='text-4xl mb-5'>Profile Page</p>

      <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Logout</button>
    </div>
  )
}
