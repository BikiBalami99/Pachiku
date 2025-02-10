export async function fetchUserWithEmail(email: string) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/user?email=${email}`
    );
    if (!res.ok) {
        console.log("Failed to fetchUsers");
        throw new Error("Failed to fetch user with email");
    }
    return res.json();
}

export async function fetchUserWithUserId(userId: string) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/user?userId=${userId}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch user with User Id");
    }

    return res.json();
}
