import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// To make a new comment on a specific pachiku
export async function POST(request: Request) {
    const { newComment, userId, pachikuId } = await request.json();
    try {
        await prisma.comment.create({
            data: {
                comment: newComment,
                userId,
                pachikuId,
            },
        });
        revalidatePath(`/pachiku-page/${pachikuId}`);
        console.log("revalidated path", `/pachiku-page/${pachikuId}`);
    } catch (error) {
        console.log("Error posting new comment");
        return NextResponse.json({ message: `error ${error}`, status: 500 });
    }

    return NextResponse.json({
        message: "success",
        status: 200,
    });
}
