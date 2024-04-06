// import { NextRequest, NextResponse } from "next/server";
// import connect from "@/utils/dbConnect";
// import Listing from "@/models/Listing";



import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

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

            // extract public id's from image url in DB
    const publicIds = listing.images.map((imageUrl: any) => {
        const parts = imageUrl.split('/');
        return parts.at(-1).split('.').at(0);
      });
   
      // Delete images from Cloudinary
      if (publicIds.length > 0) {
        for (let publicId of publicIds) {
          await cloudinary.uploader.destroy('Listing_NextJS/' + publicId);
        }
      }

        await listing.deleteOne();
        return new NextResponse("Listing deleted successfully", { status: 200 });

    } catch (error) {
        return new NextResponse("Error deleting listing: " + error, { status: 500 });
    }
};