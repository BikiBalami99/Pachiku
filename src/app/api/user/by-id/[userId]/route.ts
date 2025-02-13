import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get the user by user-id
export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    console.log("We hit userID handler");
    const { userId } = await params;

    if (!userId || typeof userId !== "string") {
        return NextResponse.json(
            { error: "Invalid userId parameter" },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch user by userId. Error: ${error}` },
            { status: 500 }
        );
    }
}
