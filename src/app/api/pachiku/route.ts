import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// get a specific pachiku of a specific ID. Taking the id from the URL. We need to make sure, the link used should have the id of the pachiku.
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

// To create a new Pachiku
export async function POST(request: Request) {
    const { pachikuText, userId } = await request.json();

    // Error handling
    if (!pachikuText) {
        return NextResponse.json(
            { error: "No pachikuText provided in POST request." },
            { status: 400 }
        );
    }

    if (!userId) {
        return NextResponse.json(
            { error: "No UserId provided in POST request" },
            { status: 400 }
        );
    }

    try {
        const response = await prisma.pachiku.create({
            data: {
                pachiku: pachikuText,
                userId,
            },
        });

        return NextResponse.json(
            { message: "Pachiku created successfully", data: response },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
