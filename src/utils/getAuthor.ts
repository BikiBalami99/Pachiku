import { Pachiku } from "@prisma/client";

export async function getAuthor(pachiku: Pachiku) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/author?userId=${pachiku.userId}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch author. Error: ${response.json()}`);
    }

    return response.json();
}