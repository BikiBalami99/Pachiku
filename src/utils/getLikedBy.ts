export async function getLikedBy(pachikuId: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/liked-by?pachikuId=${pachikuId}`;

    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Error fetching likedBy: ${response.statusText}`);
        }
        const likedBy = await response.json();
        return likedBy;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(errorMessage);
    }
}
