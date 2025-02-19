import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID must be given as query" });
    }

    const thisUserExists = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!thisUserExists) {
        return NextResponse.json({ error: "User with that id does not exist" });
    }

    const allPachikusOfUser = await prisma.pachiku.findMany({
        where: { userId },
    });

    // If a user exists but no pachikus, it just means we return an empty array.
    if (!allPachikusOfUser) {
        return NextResponse.json([]);
    }

    return NextResponse.json(allPachikusOfUser);
}
