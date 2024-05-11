import connect from "@/utils/dbConnect";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; //to solve bug uploading to vercel

export const GET = async (Request: NextRequest, Response: NextResponse) => {
  try {
    await connect();

    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;



    const unreadMessages = await Message.find({
        recipient: userId, read: false
    });

    const count = unreadMessages.length;

    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching messages, please try again later" },
      { status: 500 }
    );
  }
};
