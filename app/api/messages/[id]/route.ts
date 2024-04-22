import connect from "@/utils/dbConnect";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; //to solve bug uploading to vercel

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

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

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 });
    }

    if (message.recipient.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    };

    message.read = !message.read;

    await message.save();

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error sending message, please try again later" },
      { status: 500 }
    );
  }
};


export const DELETE = async ( 
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

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

        const message = await Message.findById(id);

        if (!message) {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        if (message.recipient.toString() !== userId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await message.deleteOne();

        return NextResponse.json({ message: "Message deleted" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error deleting message, please try again later" },
            { status: 500 }
        );
    }

}