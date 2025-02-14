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

export async function getAllPachikus() {
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/all-pachikus`,
        { next: { revalidate: 20 } }
    );

    if (!response) {
        throw new Error("Failed to execute getAllPachikus()");
    }

    return response.json();
}
