import { NextAuthOptions } from "next-auth";
import { randomBytes } from "crypto";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
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
		CredentialsProvider({
			name: "PachikuId",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: { username: credentials?.username },
				});

				if (
					user &&
					user.password &&
					bcrypt.compareSync(credentials!.password, user.password)
				) {
					return user;
				} else {
					throw new Error("Invalid username or password");
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				const prismaUser = user as {
					id: string;
					email: string;
					firstName: string;
					lastName: string;
					image: string;
				};
				return {
					...token,
					id: prismaUser.id,
					email: prismaUser.email,
					name: `${prismaUser.firstName} ${prismaUser.lastName}`,
					picture: prismaUser.image,
				};
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.image = token.picture as string;
			}
			return session;
		},
		async signIn({ profile, account }) {
			if (!account) {
				return false;
			}

			if (account.provider === "google") {
				if (!profile?.email) {
					throw new Error("No profile");
				}

				const {
					email,
					given_name = "User",
					family_name = "Earthling",
					picture = "/icons/no-image-icon.svg",
				} = profile as GoogleProfile;

				const generateShortId = () => randomBytes(4).toString("hex"); // 8 chars
				const defaultUserName = `${family_name}${given_name}-${generateShortId()}`; //randomUUDID hopefully is unique

				await prisma.user.upsert({
					where: { email },
					create: {
						email,
						firstName: given_name,
						lastName: family_name,
						username: defaultUserName,
						image: picture,
					},
					update: { image: picture },
				});

				return true;
			} else if (account.provider === "credentials") {
				return true;
			}
			return false;
		},
	},
};
