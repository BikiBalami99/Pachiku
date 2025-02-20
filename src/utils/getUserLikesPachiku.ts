export async function getUserLikesPachiku(
    currentUserId: string,
    pachikuId: string
): Promise<boolean> {
    // client side only
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-likes-pachiku?userId=${currentUserId}&pachikuId=${pachikuId}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Error fetching user likes pachiku data");
    }

    const data = await response.json();
    return data.hasLiked;
}
