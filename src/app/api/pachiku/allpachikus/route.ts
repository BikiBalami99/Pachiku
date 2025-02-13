import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all pachikus (used in feed) and include the comments and likedBy
export async function GET() {
    try {
        const allPachiku = await prisma.pachiku.findMany({
            include: {
                comments: true,
                likedBy: true,
            },
        });

        if (!allPachiku) {
            return NextResponse.json(
                { status: "No Pachiku entries found" },
                { status: 404 }
            );
        }
        if (allPachiku.length === 0) return NextResponse.json([]);
        return NextResponse.json(allPachiku);
    } catch (error) {
        return NextResponse.json(
            { error: `Error fetching Pachiku: ${error}` },
            { status: 500 }
        );
    }
}
