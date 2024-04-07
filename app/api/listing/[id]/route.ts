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

export const PUT = async (request: NextRequest, { params, body }: { params: { id: string }, body: any }) => {
    const { id } = params;

    try {
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const {userId} = sessionUser;
        await connect();
        const listing = await Listing.findById(id);
        if (!listing) {
            return new NextResponse("Listing not found", { status: 404 });
        }

        if(listing.owner.toString() !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedListing = await Listing.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return new NextResponse(JSON.stringify(updatedListing), { status: 200 });

    } catch (error) {
        return new NextResponse("Error updating listing: " + error, { status: 500 });
    }
}

// export async function PUT(Request: NextRequest, Response: NextResponse) {
//     try {
//       await connect();
  
//       const sessionUser = await getSessionUser();
  
//       if (!sessionUser) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//       }
  
//       const { userId } = sessionUser;
  
//       const body = await Request.formData();
  
//       const listingData = {
//         name: body.get("name"),
//         type: body.get("type"),
//         description: body.get("description"),
//         location: {
//           street: body.get("location[street]"),
//           city: body.get("location[city]"),
//           state: body.get("location[state]"),
//           zipcode: body.get("location[zipcode]"),
//         },
//         beds: body.get("beds"),
//         baths: body.get("baths"),
//         square_feet: body.get("square_feet"),
//         amenities: body.getAll("amenities"),
//         rates: {
//           nightly: body.get("rates[nightly]"),
//           weekly: body.get("rates[weekly]"),
//           monthly: body.get("rates[monthly]"),
//         },
//         seller_info: {
//           name: body.get("seller_info[name]"),
//           email: body.get("seller_info[email]"),
//           phone: body.get("seller_info[phone]"),
//         },
//         owner: userId,
//         images: [] as string[],
//         // images: body.getAll("images"),
//       };
  
//       //Upload Images to Cloudinary
//       const imagesUpload = [];
//       for (const image of body.getAll("images")) {
//         if (image instanceof File) {
//           const imageBuffer = await image.arrayBuffer();
//           const imageArray = new Uint8Array(imageBuffer);
//           const base64Image = Buffer.from(imageArray).toString("base64");
//           const cloudinaryResponse = await cloudinary.uploader.upload(
//             "data:image/png;base64," + base64Image,
//             {
//               folder: "Listing_NextJS",
//             }
//           );
//           imagesUpload.push(cloudinaryResponse.secure_url);
  
//           const imageUpload = await Promise.all(imagesUpload);
  
//           listingData.images = imageUpload;
//         }
//       }
  
//       // console.log(listingData);
  
//       const newListing = new Listing(listingData);
//       // console.log(newListing);
//       await newListing.save();
  
//       return new NextResponse("Listing created", { status: 201 });
//     } catch (error) {
//       return NextResponse.json({ message: "Error occurred" }, { status: 504 });
//     }
//   }
  