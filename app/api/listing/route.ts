import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Listing from "@/models/Listing";
import { request } from "http";


export const GET = async (request: NextRequest) => {
    try {
        await connect();
        const listings = await Listing.find({});
        return  NextResponse.json(listings, {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching listings " + error, {status: 500})
    }
}

// export const POST = async (request: NextRequest) => {
//     try {
//         const body = await request.json();
//         const {name, type, description, location, beds, baths, square_feet, amenities, rates, seller_info, images} = body;
//         console.log(body);

//         return NextResponse.json({message: "Successful"}, {status: 200})

//     } catch(error){
//         return NextResponse.json({message: "POST erro"}, {status: 500})
//     }
// }


// export const POST = async (request: NextRequest) => {
//     try {
//         const body = await request.json();

//         // Destructure the request body
//         const { name, type, description, beds, baths, square_feet, rates, seller_info } = body;

//         // Convert amenities to an array
//         const amenities: string[] = Array.isArray(body.amenities) ? body.amenities : [];

//         // Convert images to an array of objects
//         const images: { url: string }[] = Array.isArray(body.images) ? body.images.map((image: string) => ({ url: image })) : [];

//         // Convert location to an object
//         const location: { street: string, city: string, state: string, zipcode: string } = body.location ? {
//             street: body.location.street || "",
//             city: body.location.city || "",
//             state: body.location.state || "",
//             zipcode: body.location.zipcode || ""
//         } : {street: "", city: "", state: "", zipcode: ""};

//         // Log the processed data
//         console.log({
//             name,
//             type,
//             description,
//             location,
//             beds,
//             baths,
//             square_feet,
//             amenities,
//             rates,
//             seller_info,
//             images
//         });

//         // Return a success response
//         return NextResponse.json({ message: "Successful" }, { status: 200 });

//     } catch (error) {
//         // Return an error response
//         return NextResponse.json({ message: "POST error" }, { status: 500 });
//     }
// };
