import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { NextRequest } from "next/server";


type Session = {
    user: {
        id: string;
    };
};

export const getSessionUser = async () => {

    try {
        const session: Session | null = await getServerSession({req: NextRequest, ...authOptions});
        if (!session || !session.user) {
            return null;
        }
        return {
            user: session.user,
            userId: session.user.id,
        };
    } catch (error) {
        console.error("Error in getSessionUser", error);
        return null;
    }

}