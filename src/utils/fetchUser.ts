export async function fetchUser(email: string) {
    console.log("fetch user reached");
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/user?email=${email}`,
        { cache: "no-store" }
    );
    if (!res.ok) {
        console.log("Failed to fetchUsers");
        throw new Error("Failed to fetch user");
    }
    return res.json();
}
