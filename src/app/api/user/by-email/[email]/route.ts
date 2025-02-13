import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get the user by email
export async function GET(
    req: Request,
    { params }: { params: Promise<{ email: string }> }
) {
    const { email } = await params;

    if (!email || typeof email !== "string") {
        return NextResponse.json(
            { error: "Invalid email parameter" },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch user by email. Error : ${error}` },
            { status: 500 }
        );
    }
}
