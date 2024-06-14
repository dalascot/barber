import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {MenuItem} from "@/models/MenuItem";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

    const {cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
  
    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    });
    return Response.json(orderDoc);
}
