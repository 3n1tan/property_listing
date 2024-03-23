import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";

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
        return  NextResponse.json(listings, {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching listings " + error, {status: 500})
    }
}



// export const POST = async (request:NextRequest) => {
//     try {

//         const body = await request.json();
//         console.log(body.file)

//         return NextResponse.json({message: "Success is here!!!"}, {status: 200})
//         // return NextResponse.json(body.images)

//     } catch (error) {
//         return NextResponse.json({message: "Error occurred"}, {status: 504})
//     }

//     }

    

export async function POST(request: NextRequest){
  try {
    const body = await request.formData();
    console.log(body.getAll('images'));
    console.log(body.get('amenities'));
    return NextResponse.json({message: "Success is here!!!"}, {status: 200})
  
  } catch (error) {
    return NextResponse.json({message: "Error occurred"}, {status: 504})
  
  }


}



