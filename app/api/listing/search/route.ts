import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) => {
    try {
        await connect();

        const { searchParams} = new URL(request.url);
        const location = searchParams.get("location") || '';
        const listType = searchParams.get("listType");

        const locationPattern = new RegExp(location, "i");

        let query: any = {
            $or: [
                {name: locationPattern},
                {description: locationPattern},
                {'location.street': locationPattern},
                {'location.city': locationPattern},
                {'location.state': locationPattern},    
                {'location.zipcode': locationPattern},
            ],
        };

        if (listType && listType !== 'all') {
            const typePattern = new RegExp(listType, "i");
            query.type = typePattern;
        }

        const listings = await Listing.find(query);
        return NextResponse.json(
            listings,
            { status: 200 }
            );
    } catch(error) {
        console.log(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }

}