"use client";

import { updateUser } from "@/app/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function DashBoardForm({ user }: { user: User }) {
    const [alertMessage, setAlertMessage] = useState("");

    async function clientUpdateUser(formData: FormData) {
        const result = await updateUser(formData);
        setAlertMessage(result.success ? result.message : result.error);
    }

    useEffect(() => {
        if (!alertMessage) return; // Only set timeout when there is a message

        const timeoutId = setTimeout(() => {
            setAlertMessage("");
        }, 2000);

        return () => clearTimeout(timeoutId); // Clear timeout on re-run
    }, [alertMessage]);

    return (
        <>
            <form action={clientUpdateUser}>
                <input
                    type="text"
                    name="firstName"
                    defaultValue={user.firstName}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    defaultValue={user.lastName}
                    required
                />
                <input
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    required
                />
                <input type="hidden" name="id" value={user.id} />
                <button type="submit">Update</button>
            </form>
            <div>
                <p>{alertMessage}</p>
            </div>
        </>
    );
}
