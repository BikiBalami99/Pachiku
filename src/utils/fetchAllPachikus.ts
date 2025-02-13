export async function fetchAllPachikus() {
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/pachiku/allPachikus`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch all pachikus");
    }

    return response.json();
}
