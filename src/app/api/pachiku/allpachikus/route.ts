import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// should GET all the pachiku from the server to show on the feed.
export async function GET() {
    const allPachiku = await prisma.pachiku.findMany({
        include: {
            comments: true,
            likedBy: true,
        },
    });

    return NextResponse.json(allPachiku);
}
