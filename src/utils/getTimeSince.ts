export function getTimeSince(date: Date) {
    const now = new Date();

    // Difference in milli seconds
    const diffInMs = now.getTime() - date.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
    const hours = Math.floor(diffInMinutes / 60); // Calculate hours
    const minutes = diffInMinutes % 60; // Calculate remaining minutes
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Calculate days

    if (days > 0) {
        // If the difference is more than 24 hours, return in "Xd" format
        return `${days}d`;
    } else if (hours > 0) {
        // If the difference is 1 hour or more but less than 24 hours, return in "Xh Ym" format
        return `${hours}h ${minutes}m`;
    } else {
        // If the difference is less than 1 hour, return in "Ym" format
        return `${minutes}m`;
    }
}
