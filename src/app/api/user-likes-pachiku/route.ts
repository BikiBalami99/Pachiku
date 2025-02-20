import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const pachikuId = url.searchParams.get("pachikuId");

    if (!userId || !pachikuId) {
        return NextResponse.json(
            { error: "Did not receive required queries" },
            { status: 400 }
        );
    }

    const userLikesPachiku = await prisma.like.findUnique({
        where: {
            userId_pachikuId: {
                userId,
                pachikuId,
            },
        },
    });

    // if the userLikesPachiku is null, that means the user has not liked this pachiku yet.
    const hasLiked = !!userLikesPachiku;
    return NextResponse.json({ hasLiked });
}
