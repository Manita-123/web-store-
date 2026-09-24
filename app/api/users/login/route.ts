import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'


connect()

export async function POST(request:NextRequest) {
    try{

        const reqBody = await request.json()
        const {email, password} = reqBody;

        console.log(reqBody);

        // Check if user exists
        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }

        // Check if password is correct

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }

        // create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await  jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "7d"})

        const response = NextResponse.json({message: "Login Sucessfully", sucess:true})

        response.cookies.set("token", token , {httpOnly: true , } )

        return response;

    } catch (err: any){
        return NextResponse.json({error: err.message}, {status:500})
    }
}