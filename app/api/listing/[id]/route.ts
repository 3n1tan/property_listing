import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connect();
    const listing = await Listing.findById(id);
    if (!listing) {
      return new NextResponse("Listing not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching listing: " + error, {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;
    await connect();
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return new NextResponse("Listing not found", { status: 404 });
    }

    if (listing.owner.toString() !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // extract public id's from image url in DB
    const publicIds = listing.images.map((imageUrl: any) => {
      const parts = imageUrl.split("/");
      return parts.at(-1).split(".").at(0);
    });

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy("Listing_NextJS/" + publicId);
      }
    }

    await listing.deleteOne();
    return new NextResponse("Listing deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting listing: " + error, {
      status: 500,
    });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connect();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Get property to update
    const existingListing = await Listing.findById(id);

    if (!existingListing) {
      return new Response("Property does not exist", { status: 404 });
    }

    // Verify ownership authorization
    if (existingListing.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Create listingData object for database
    const listingData = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location[street]"),
        city: formData.get("location[city]"),
        state: formData.get("location[state]"),
        zipcode: formData.get("location[zipcode]"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: formData.getAll("amenities"),
      rates: {
        nightly: formData.get("rates[nightly]"),
        weekly: formData.get("rates[weekly]"),
        monthly: formData.get("rates[monthly]"),
      },
      seller_info: {
        name: formData.get("seller_info[name]"),
        email: formData.get("seller_info[email]"),
        phone: formData.get("seller_info[phone]"),
      },
      owner: userId,
    };

    // Update property in database
    const updatedListing = await Listing.findByIdAndUpdate(id, listingData);
    // console.log(formData.getAll("amenities"));
    // console.log(formData.get("baths"));

    return new Response(JSON.stringify(updatedListing), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add property", { status: 500 });
  }
};

