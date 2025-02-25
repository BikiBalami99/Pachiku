export async function updatePachiku(formData: FormData) {
    if (
        !(formData instanceof FormData) ||
        !formData.has("pachikuId") ||
        !formData.has("editedPachikuText")
    ) {
        throw new Error("Invalid input");
    }

    const pachikuId = formData.get("pachikuId");
    const editedPachikuText = formData.get("editedPachikuText");

    if (!pachikuId || !editedPachikuText) {
        throw new Error("Invalid input");
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/pachiku`,
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    pachikuId: pachikuId.toString(),
                    editedPachikuText: editedPachikuText.toString(),
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Pachiku");
        }

        const data = await response.json();
        console.log("Pachiku updated successfully:", data);
    } catch (error) {
        console.error("Error updating Pachiku:", error);
    } 
}
