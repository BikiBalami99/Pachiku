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

        const user = await res.json();
        return user;
    } catch (error) {
        console.error("Network error fetching user: ", error);
        return { error: "Network error fetching user:" };
    }
}

export async function getUserByEmail(email: string) {
    if (!email) return { error: "Invalid email" };
    try {
        // Since we using public api, this will be used in a client component
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/by-email/${email}`
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            // Handled potential invalid JSON
            return {
                error:
                    errorData.error ||
                    `Error fetching user: ${errorData.statusText}`,
            };
        }

        const user = await res.json();
        return user;
    } catch (error) {
        console.error("Network error fetching user: ", error);
        return { error: "Network error fetching user:" };
    }
}
