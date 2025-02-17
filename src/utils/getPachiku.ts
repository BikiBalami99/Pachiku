export async function getSpecificPachiku(pachikuId: string) {
    const url = `${process.env.NEXTAUTH_URL}/api/pachiku?pachikuId=${pachikuId}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Return null if the Pachiku isn't found
            }
            throw new Error(`Failed to fetch Pachiku: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching specific Pachiku from ${url}:`, error);
        return null;
    }
}
export async function getSpecificPachikuClient(pachikuId: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/pachiku?pachikuId=${pachikuId}`;
    try {
        const response = await fetch(url);
        console.log("Response:", response);
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Return null if the Pachiku isn't found
            }
            throw new Error(`Failed to fetch Pachiku: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching specific Pachiku from ${url}:`, error);
        return null;
    }
}

export async function getAllPachikus() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/all-pachikus`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch Pachikus");
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching Pachikus from ${url}:`, error);
        return null;
    }
}
