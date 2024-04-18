import connect from "@/utils/dbConnect";
import User from "@/models/User";
import Listing from "@/models/Listing";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    return NextResponse.json({ text, isFavourite });

    // return new NextResponse("Listing added to favourites", {status: 200})
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding listing to favourites " + error },
      { status: 500 }
    );
  }
};


export const GET = async() => {
  try {
    await connect();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { message: "Unauthorized!!! User ID required" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    const listingsFavs = await Listing.find({ _id: { $in: user.favourites } });

    return NextResponse.json(listingsFavs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching favourites " + error },
      { status: 500 }
    );
  }
}