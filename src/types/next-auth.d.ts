import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client"; // Import Prisma's User type

declare module "next-auth" {
    interface Session {
        user: PrismaUser & {
            // You can add additional properties if needed
        };
    }

    interface User extends PrismaUser {}
}
