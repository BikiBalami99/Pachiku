import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// get the author of a pachiku. the userId is given from a pachiku.userId.
export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID must be given as query" });
    }

    const author = await prisma.user.findUnique({ where: { id: userId } });

    if (!author) {
        return NextResponse.json({ error: "No author found with that id." });
    }

    return NextResponse.json(author);
}
