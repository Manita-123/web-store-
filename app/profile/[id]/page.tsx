import { log } from "console"


export default async function UserProfile({params}: any) {

    const { id } = await params;
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>User Profile</h1>
      <hr />
      <p className="text-xl">Profile <span className="p-2 rounded bg-orange-300"> {id}</span></p>
    </div>
  )
}
