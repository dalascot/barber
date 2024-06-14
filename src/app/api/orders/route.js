import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {User} from "@/models/User";
export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

 const session = await getServerSession(authOptions);
    const userEmails = session?.user?.email;
    const admin = await User.findOne({email:userEmails})
    const url = new URL(req.url);
  const userLog=  await Order.find() 
 if(  admin){
   return (Response.json(userLog))
 }
    return (Response.json(await Order.find({userEmail:userEmails})))  
      
     
   
   }
