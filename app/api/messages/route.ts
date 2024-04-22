import connect from "@/utils/dbConnect";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";


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

    const messages = await Message.find({
      recipient: userId })
      .populate("sender", "username")
      .populate("listing", "name")
      
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching messages, please try again later" },
      { status: 500 }
    );
  }

}
type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  listing: any;
  recipient: any;
};

export const POST = async (Request: NextRequest, Response: NextResponse) => {
  try {
    await connect();

    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { message: "You must be logged in to send a message" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;
    console.log(userId);

    const body = await Request.json();
    const messageData: FormValues = body;

    if (userId === messageData.recipient) {
      return NextResponse.json(
        { message: "You cannot send a message to yourself" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      ...messageData,
      sender: userId,
    });

    // console.log(newMessage);

    await newMessage.save();

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error sending message, please try again later" },
      { status: 500 }
    );
  }
};
