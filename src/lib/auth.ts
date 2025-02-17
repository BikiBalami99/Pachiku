import { NextAuthOptions } from "next-auth";
import { randomBytes } from "crypto";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ profile }) {
            if (!profile?.email) {
                throw new Error("No profile");
            }

            const { email, given_name, family_name, picture } =
                profile as GoogleProfile;

            const generateShortId = () => randomBytes(4).toString("hex"); // 8 chars
            const defaultUserName = `${family_name}${given_name}-${generateShortId()}`; //randomUUDID hopefully is unique

            const image = picture ?? "/icons/no-image-icon.svg";

            await prisma.user.upsert({
                where: { email },
                create: {
                    email,
                    firstName: given_name,
                    lastName: family_name,
                    username: defaultUserName,
                    image,
                },
                update: { image },
            });

            return true;
        },
    },
};
