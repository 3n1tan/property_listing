import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";


interface userListingProps {
    params: {
        userid: string;
    }
}

//API route /api/listing/user/[userid]
export const GET = async (request: NextRequest, {params}: userListingProps) => {
    try {
      await connect();
      const userId = params.userid;
      if (!userId) {
        return new NextResponse("User id is required", { status: 400 });
      }
      const listings = await Listing.find({owner: userId});
      return NextResponse.json(listings, { status: 200 });
    } catch (error) {
      return new NextResponse("Error in fetching listings " + error, {
        status: 500,
      });
    }
  };