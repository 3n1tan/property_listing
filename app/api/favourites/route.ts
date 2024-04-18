import connect from "@/utils/dbConnect";
import User from "@/models/User";
import Listing from "@/models/Listing";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export const POST = async (Request: NextRequest, Response: NextResponse) => {
  try {
    await connect();

    const { listingId } = await Request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { message: "Unauthorized!!! User ID required" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    // const user = await User.findOne({ _id: userId });
    const user = await User.findById(userId);

    let isFavourite = user.favourites.includes(listingId);

    let text;

    if (isFavourite) {
      user.favourites.pull(listingId);
      text = "Listing removed from favourites";
      isFavourite = false;
    } else {
      user.favourites.push(listingId);
      text = "Listing added to favourites";
      isFavourite = true;
    }
    await user.save();

    return new NextResponse("Listing added to favourites", {status: 200})

  } catch (error) {
    return new NextResponse("Error adding listing to favourites " + error, {
      status: 500,
    });
  }
};
