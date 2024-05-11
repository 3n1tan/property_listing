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

    const readMessages = await Message.find({
      recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("listing", "name");

    const unreadMessages = await Message.find({
      recipient: userId, read: false })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("listing", "name");

    const messages = [...unreadMessages, ...readMessages];
      
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
