import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

 const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await User.findOne({email:userEmail})
    const url = new URL(req.url);
    if (userEmail) {
        return Response.json( await Order.find({userEmail}) );
      }
      
  
      if(admin){
        return Response.json(await Order.find())
      }
      else{return ('error')}
  
   
   }
