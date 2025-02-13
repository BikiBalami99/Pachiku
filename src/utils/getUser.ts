export async function getUserByUserId(userId: string) {
    if (!userId) return { error: "Invalid userId" };

    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/user/by-id/${userId}`
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            // Handlred potential invalid JSON
            return {
                error:
                    errorData.error ||
                    `Error fetching user: ${errorData.statusText}`,
            };
        }

        const data = await res.json();
        return { data };
    } catch (error) {
        console.error("Network error fetching user: ", error);
        return { error: "Network error fetching user:" };
    }
}
