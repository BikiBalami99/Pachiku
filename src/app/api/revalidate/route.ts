import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// To revalidate any route through a client component

// to revalidate the all-pachikus route
export async function POST() {
    try {
        revalidatePath("/api/all-pachikus");
        revalidatePath("/");
        return NextResponse.json({ revalidated: true });
    } catch (err) {
        return NextResponse.json(
            { error: `Error revalidating: ${err}` },
            { status: 500 }
        );
    }
}
