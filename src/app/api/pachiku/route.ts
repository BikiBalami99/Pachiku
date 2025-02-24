import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function for error responses
function errorResponse(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

// Fetch a specific Pachiku by ID from the URL. Ensure the link includes the Pachiku ID.
export async function GET(request: Request) {
    // Extract pachikuId from query parameters
    const url = new URL(request.url);
    const pachikuId = url.searchParams.get("pachikuId");

    if (!pachikuId) {
        return errorResponse("pachikuId is required", 400);
    }

    const pachiku = await prisma.pachiku.findUnique({
        where: { id: pachikuId },
        include: { comments: true },
    });

    if (!pachiku) {
        return errorResponse("Pachiku not found", 404);
    }

    return NextResponse.json(pachiku);
}

// To create a new Pachiku
export async function POST(request: Request) {
    const { pachikuText, email } = await request.json();

    // Error handling
    if (!pachikuText) {
        return errorResponse("No pachikuText provided in POST request.", 400);
    }

    if (!email) {
        return errorResponse("No email provided in POST request", 400);
    }

    // Check if the userId exists in the User table
    const author = await prisma.user.findUnique({
        where: { email },
    });

    if (!author) {
        return errorResponse("That user does not exist", 400);
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
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        return errorResponse(
            `An error occurred while creating the pachiku: ${errorMessage}`,
            500
        );
    }
}

export async function PATCH(req: Request) {
    const { pachikuId, editedPachikuText } = await req.json();

    if (!pachikuId) {
        return errorResponse("Pachiku Id is required", 400);
    }

    if (!editedPachikuText) {
        return errorResponse("New Pachiku Text is required.", 400);
    }

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
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        return errorResponse(
            `An error occurred while updating the pachiku: ${errorMessage}`,
            500
        );
    }
}

export async function DELETE(req: Request) {
    const { pachikuId, currentUserId } = await req.json();

    if (!pachikuId) {
        return errorResponse("Pachiku Id is required.", 400);
    }
    if (!currentUserId) {
        return errorResponse("CurrentUser is required.", 400);
    }

    try {
        // Fetch the Pachiku and its author
        const pachiku = await prisma.pachiku.findUnique({
            where: { id: pachikuId },
            include: { user: true },
        });

        if (!pachiku) {
            return errorResponse("That pachiku does not exist.", 404);
        }
        if (pachiku.user.id !== currentUserId) {
            return errorResponse("Unauthorized action.", 403);
        }

        // Delete the comments and likes first
        await prisma.comment.deleteMany({ where: { pachikuId: pachiku.id } });
        await prisma.like.deleteMany({ where: { pachikuId: pachiku.id } });

        // Delete the Pachiku
        const deletedPachiku = await prisma.pachiku.delete({
            where: { id: pachikuId },
        });

        return NextResponse.json(
            { message: "Successfully deleted.", data: deletedPachiku },
            { status: 200 }
        );
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        return errorResponse(
            `An error occurred while deleting the pachiku: ${errorMessage}`,
            500
        );
    }
}
