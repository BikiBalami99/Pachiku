import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/utils/getUser";

// This route handles either liking or unliking a pachiku
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pachikuId } = await request.json();
    if (!pachikuId) {
        return NextResponse.json(
            { error: "Missing pachikuId" },
            { status: 400 }
        );
    }

    const user = await getUserByEmail(session.user.email);
    const userId = user.id;

    try {
        const existingLike = await prisma.like.findUnique({
            where: { userId_pachikuId: { userId, pachikuId } },
        });

        if (existingLike) {
            // Unlike the pachiku
            await prisma.like.delete({
                where: { userId_pachikuId: { userId, pachikuId } },
            });

            const updatedPachiku = await prisma.pachiku.update({
                where: { id: pachikuId },
                data: { likes: { decrement: 1 } },
                select: { likes: true },
            });

            return NextResponse.json({
                liked: false,
                newLikesCount: updatedPachiku.likes,
            });
        } else {
            // Like the pachiku
            await prisma.like.create({
                data: { userId, pachikuId },
            });

            const updatedPachiku = await prisma.pachiku.update({
                where: { id: pachikuId },
                data: { likes: { increment: 1 } },
                select: { likes: true },
            });

            return NextResponse.json({
                liked: true,
                newLikesCount: updatedPachiku.likes,
            });
        }
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
