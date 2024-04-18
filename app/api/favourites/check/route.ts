import connect from "@/utils/dbConnect";
import User from "@/models/User";
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
    
        const user = await User.findById(userId);
    
        let isFavourite = user.favourites.includes(listingId);
    

    
        return NextResponse.json({ isFavourite });
    } catch (error) {
        return NextResponse.json(
        { message: "Error adding listing to favourites " + error },
        { status: 500 }
        );
    }
}