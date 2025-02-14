import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const allPachikus = await prisma.pachiku.findMany({
            include: { comments: true, likedBy: true },
            orderBy: { createdAt: "desc" },
            take: 20,
        });

        return NextResponse.json(allPachikus, { status: 200 });
    } catch (error) {
        console.error("Error fetching pachikus:", error);
        return NextResponse.json(
            { error: "Something went wrong while fetching pachikus." },
            { status: 500 }
        );
    }
}
