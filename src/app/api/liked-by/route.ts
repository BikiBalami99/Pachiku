import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const pachikuId = url.searchParams.get("pachikuId");
        if (!pachikuId) throw new Error("Invalid URL: pachikuId is required");

        const pachiku = await prisma.pachiku.findUnique({
            where: { id: pachikuId },
            include: {
                likedBy: {
                    include: {
                        likedBy: true, // Include the full User data
                    },
                },
            },
        });

        if (!pachiku) {
            return NextResponse.json(
                { error: "Pachiku not found" },
                { status: 404 }
            );
        }

        const likedBy = pachiku.likedBy.map((like) => like.likedBy);
        return NextResponse.json(likedBy);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { error: `Error getting likedBy: ${errorMessage}` },
            { status: 500 }
        );
    }
}
