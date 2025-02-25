"use client";

import { updateUser } from "@/components/UserUpdateForm/updateUserAction";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./UserUpdateForm.module.css";
import UserImage from "../MainPachikuComponents/UserImage/UserImage";

export default function UserUpdateForm({ user }: { user: User }) {
    const [alertMessage, setAlertMessage] = useState("");

    async function clientUpdateUser(formData: FormData) {
        const result = await updateUser(formData);
        setAlertMessage(result.success ? result.message : result.error);
    }

    useEffect(() => {
        if (!alertMessage) return; // Only set timeout when there is a message

        const timeoutId = setTimeout(() => {
            setAlertMessage("");
        }, 5000);

        return () => clearTimeout(timeoutId); // Clear timeout on re-run
    }, [alertMessage]);

    return (
        <section className={styles.dashboardForm}>
            <UserImage src={user.image} userFirstName={user.firstName} />
            <form action={clientUpdateUser} className={styles.form}>
                <div className={styles.firstRow}>
                    <div className={styles.labelAndForm}>
                        <label htmlFor="firstName">Firstname</label>
                        <input
                            type="text"
                            name="firstName"
                            defaultValue={user.firstName}
                            required
                        />
                    </div>
                    <div className={styles.labelAndForm}>
                        <label htmlFor="lastName">Lastname</label>
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={user.lastName}
                            required
                        />
                    </div>
                </div>
                <div className={styles.labelAndForm}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        defaultValue={user.username}
                        required
                    />
                </div>
                <input type="hidden" name="id" value={user.id} />
                <div className={styles.feedbackAndButton}>
                    <p
                        className={styles.feedback}
                        data-visible={!!alertMessage}
                    >
                        {alertMessage}
                    </p>
                    <button type="submit" className="button primaryButton">
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
}
