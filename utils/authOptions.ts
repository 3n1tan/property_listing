import GoogleProvider from "next-auth/providers/google";
import connect from "./dbConnect";
import User from "@/models/User";
import {  Profile } from "next-auth";



interface UserProfile extends Profile {
    name: string;
    email: string;
    picture?: string;
  }


export const authOptions: any = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
      })
    ],
    callbacks: {
        async signIn({ profile }: {profile: UserProfile}) {
            await connect()
            const userExists = await User.findOne({ email: profile.email});
            if (!userExists) {
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            return true;

        },
        async session ({ session }: { session: any }) {
            const user = await User.findOne({email: session.user.email});
            session.user.id = user._id.toString();
            return session;
        },
    },

}
