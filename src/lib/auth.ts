import { NextAuthOptions } from "next-auth";
import { randomUUID } from "crypto";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google OAuth environment variables");
}

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
            const defaultUserName = `user-${randomUUID()}`;
            const image = picture ?? "/icons/no-image-icon.svg";

            const upsertedUser = await prisma.user.upsert({
                where: { email },
                create: {
                    email,
                    firstName: given_name,
                    lastName: family_name,
                    username: defaultUserName,
                    image,
                },
                update: { firstName: given_name, lastName: family_name },
            });

            console.log("Upserted User: ", upsertedUser);

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as User;
            }
            return session;
        },
    },
};
