// import { NextRequest, NextResponse } from "next/server";
// import connect from "@/utils/dbConnect";
// import Listing from "@/models/Listing";



import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        await connect();
        const listing = await Listing.findById(id);
        if (!listing) {
            return new NextResponse("Listing not found", { status: 404 });
        }
        return new NextResponse(JSON.stringify(listing), { status: 200 });

    } catch (error) {
        return new NextResponse("Error fetching listing: " + error, { status: 500 });
    }
};


export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const {userId} = sessionUser;
        await connect();
        const listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return new NextResponse("Listing not found", { status: 404 });
        }

        if(listing.owner.toString() !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await listing.deleteOne();
        return new NextResponse("Listing deleted successfully", { status: 200 });

    } catch (error) {
        return new NextResponse("Error deleting listing: " + error, { status: 500 });
    }
};