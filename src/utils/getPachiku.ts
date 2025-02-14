export async function fetchAllPachikus() {
    try {
        // const baseUrl = process.env.NEXTAUTH_URL;
        const response = await fetch(
            `http://localhost:3000/api/pachiku/allPachikus`
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch all pachikus: ${response.statusText}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all pachikus:", error);
        throw error;
    }
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
