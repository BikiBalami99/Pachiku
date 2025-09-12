import { User as PrismaUser } from "@prisma/client"; // Import Prisma's User type

declare module "next-auth" {
	interface Session {
		user: PrismaUser & {
			name: string;
		};
	}
}
