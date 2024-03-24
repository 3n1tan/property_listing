import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";
import { getSessionUser } from "@/utils/getSessionUser";


type FormValues = {
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: {
    nightly: string;
    weekly: string;
    monthly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: File[];
};

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const listings = await Listing.find({});
    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching listings " + error, {
      status: 500,
    });
  }
};

export async function POST(Request: NextRequest, Response:NextResponse){
  try {
    await connect();

    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {userId} = sessionUser;

    const body = await Request.formData();

    const listingData = {
      name: body.get("name"),
      type: body.get("type"),
      description: body.get("description"),
      location: {
        street: body.get("location[street]"),
        city: body.get("location[city]"),
        state: body.get("location[state]"),
        zipcode: body.get("location[zipcode]"),
      },
      beds: body.get("beds"),
      baths: body.get("baths"),
      square_feet: body.get("square_feet"),
      amenities: body.getAll("amenities"),
      rates: {
        nightly: body.get("rates[nightly]"),
        weekly: body.get("rates[weekly]"),
        monthly: body.get("rates[monthly]"),
      },
      seller_info: {
        name: body.get("seller_info[name]"),
        email: body.get("seller_info[email]"),
        phone: body.get("seller_info[phone]"),
      },
      owner: userId,
      // images: body.getAll("images"),
    };

    console.log(listingData);

    const newListing = new Listing(listingData);
    console.log(newListing);
    await newListing.save();

    return new NextResponse("Listing created", { status: 201 });


  } catch (error) {
    return NextResponse.json({ message: "Error occurred" }, { status: 504 });
  }
}
