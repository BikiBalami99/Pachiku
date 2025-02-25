// Function to delete a Pachiku
export async function deletePachiku(formData: FormData) {
    // Check if the input is an instance of FormData
    if (!(formData instanceof FormData)) {
        throw new Error("Invalid Input");
    }

    // Extract pachikuId and currentUserId from the form data
    const pachikuId = formData.get("pachikuId");
    const currentUserId = formData.get("currentUserId");

    // Validate that both pachikuId and currentUserId are provided
    if (!pachikuId || !currentUserId) {
        throw new Error("Pachiku ID and current user ID required.");
    }

    try {
        // Send a DELETE request to the API to delete the Pachiku
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/pachiku`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pachikuId: pachikuId.toString(),
                    currentUserId: currentUserId.toString(),
                }),
            }
        );

        // Check if the response is not OK (status code is not in the range 200-299)
        if (!response.ok) {
            // Parse the error message from the response body
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete pachiku");
        }

        // Parse the response data
        const responseData = await response.json();
        return {
            message: responseData.message || "Successfully deleted pachiku",
            error: null,
            success: true,
        };
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        return {
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete pachiku",
            error,
            success: false,
        };
    }
}
