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

export async function getSpecificPachiku(pachikuId: string) {
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/pachiku?pachikuId=${pachikuId}`
    );

    if (!response.ok) {
        if (response.status === 404) {
            return null; // Return null if the Pachiku isn't found
        }
        throw new Error(`Failed to fetch Pachiku: ${response.statusText}`);
    }

    return response.json();
}
