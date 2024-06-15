import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {User} from "@/models/User";
export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

 const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const url = new URL(req.url);
 const admin = await isAdmin();
 
   if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }
      
     
   
   }
