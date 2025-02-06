import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Handle POST request for liking/unliking a post
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const { pachikuId } = await request.json();
    if (!pachikuId) {
        return NextResponse.json(
            { error: "Missing pachikuId" },
            { status: 400 }
        );
    }

    const userId = session.user.id;

    try {
        const existingLike = await prisma.like.findUnique({
            where: { userId_pachikuId: { userId, pachikuId } },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: { userId_pachikuId: { userId, pachikuId } },
            });

            await prisma.pachiku.update({
                where: {
                    id: pachikuId,
                },
                data: {
                    likes: {
                        decrement: 1,
                    },
                },
            });

            return NextResponse.json({ liked: false });
        } else {
            await prisma.like.create({
                data: { userId, pachikuId },
            });

            await prisma.pachiku.update({
                where: {
                    id: pachikuId,
                },
                data: {
                    likes: {
                        increment: 1,
                    },
                },
            });

            return NextResponse.json({ liked: true });
        }
    } catch {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
