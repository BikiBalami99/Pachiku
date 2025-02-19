"use client";

import { updateUser } from "@/app/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./DashboardForm.module.css";
import UserImage from "../APachikuComponents/UserImage/UserImage";

export default function DashboardForm({ user }: { user: User }) {
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
        <section className={styles.dashboardForm}>
            <UserImage src={user.image} userFirstName={user.firstName} />
            <form action={clientUpdateUser} className={styles.form}>
                <div className={styles.firstRow}>
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
                </div>
                <input
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    required
                />
                <input type="hidden" name="id" value={user.id} />
                <div>
                    <p>{alertMessage}</p>
                    <button type="submit" className="button primaryButton">
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
}
