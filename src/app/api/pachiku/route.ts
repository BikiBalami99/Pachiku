import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Fetch a specific Pachiku by ID from the URL. Ensure the link includes the Pachiku ID.
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
        where: { id: pachikuId },
        include: { comments: true },
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
    const { pachikuText, email } = await request.json();

    // Error handling
    if (!pachikuText) {
        return NextResponse.json(
            { error: "No pachikuText provided in POST request." },
            { status: 400 }
        );
    }

    if (!email) {
        return NextResponse.json(
            { error: "No email provided in POST request" },
            { status: 400 }
        );
    }

    // Check if the userId exists in the User table
    const author = await prisma.user.findUnique({
        where: { email },
    });

    if (!author) {
        return NextResponse.json(
            { error: "That user does not exist" },
            { status: 400 }
        );
    }

    try {
        const response = await prisma.pachiku.create({
            data: {
                pachiku: pachikuText,
                userId: author.id,
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

export async function PATCH(req: Request) {
    const { pachikuId, editedPachikuText } = await req.json();

    if (!pachikuId)
        return NextResponse.json({ error: "Pachiku Id is required" });

    if (!editedPachikuText)
        return NextResponse.json({ error: "New Pachiku Text is required." });

    try {
        const updatedPachiku = await prisma.pachiku.update({
            where: { id: pachikuId },
            data: { pachiku: editedPachikuText },
        });

        return NextResponse.json(
            { message: "Pachiku updated successfully", data: updatedPachiku },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
