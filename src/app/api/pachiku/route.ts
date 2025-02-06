import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    // Extract pachikuId from query parameters
    const url = new URL(request.url);
    const pachikuId = url.searchParams.get("pachikuId");

    if (!pachikuId) {
        return NextResponse.json(
            { error: "pachikuId is required" },
            { status: 400 }
        );
    }

    const pachiku = await prisma.pachiku.findUnique({
        where: {
            id: pachikuId,
        },
    });

    if (!pachiku) {
        return NextResponse.json(
            { error: "Pachiku not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(pachiku);
}
