import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";


export const GET = async (request: NextRequest) => {
    try {
        await connect();
        const listings = await Listing.find({});
        return  NextResponse.json(listings, {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching listings " + error, {status: 500})
    }
}