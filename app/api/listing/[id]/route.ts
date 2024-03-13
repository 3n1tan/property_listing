// import { NextRequest, NextResponse } from "next/server";
// import connect from "@/utils/dbConnect";
// import Listing from "@/models/Listing";

// export const GET = async (request: NextRequest, {params}: {params: {_id: string}}) => {
//     const {_id} = params;

//     try {
//         await connect();
//         const listing = await Listing.findOne({_id});
//         if(!listing) {
//             return new NextResponse("Listing not found", {status: 404})
//         }
//         return new NextResponse(JSON.stringify(listing), {status: 200})

//     } catch (error) {
//         return new NextResponse("Error fetching Listings " + error, {status: 500})
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";

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
