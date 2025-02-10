export async function fetchUser(email: string) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/user?email=${email}`
    );
    if (!res.ok) throw new Error("Failted to fetch user");
    return res.json();
}
