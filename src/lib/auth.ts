import { NextAuthOptions } from "next-auth";
import { randomUUID } from "crypto";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
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
                where: {
                    email: profile.email,
                },
                create: {
                    email,
                    firstName: given_name,
                    lastName: family_name,
                    username: defaultUserName,
                    image,
                },
                update: {
                    firstName: given_name,
                    lastName: family_name,
                },
            });

            console.log("Upserted User: ", upsertedUser);

            return true;
        },
        async jwt({ token }) {
            // Fetch user from DB on every JWT update
            const dbUser = await prisma.user.findUnique({
                where: { email: token.email! },
            });
            if (dbUser) {
                token.user = dbUser;
            }
            return token;
        },
        async session({ session, token }) {
            // Assign database user to session
            if (token.user) {
                session.user = token.user as User;
            }
            return session;
        },
    },
};
