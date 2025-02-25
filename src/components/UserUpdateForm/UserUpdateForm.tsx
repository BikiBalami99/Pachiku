"use client";

import { updateUser } from "@/components/UserUpdateForm/updateUserAction";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./UserUpdateForm.module.css";
import UserImage from "../MainPachikuComponents/UserImage/UserImage";

export default function UserUpdateForm({ user }: { user: User }) {
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("Update");

    useEffect(() => {
        if (submitting) {
            setMessage("Updating...");
        }
    }, [submitting]);

    async function clientUpdateUser(formData: FormData) {
        const result = await updateUser(formData);
        setSubmitting(false);
        setMessage(result.success ? result.message : result.error);
        setTimeout(() => {
            setMessage("Update");
        }, 3000);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setSubmitting(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        clientUpdateUser(formData);
    }

    return (
        <section className={styles.dashboardForm}>
            <UserImage src={user.image} userFirstName={user.firstName} />
            <form onSubmit={handleSubmit} className={styles.form}>
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

                <button type="submit" className="button primaryButton">
                    {submitting ? (
                        <>
                            <div className={styles.spinner}></div>
                            {message}
                        </>
                    ) : (
                        message
                    )}
                </button>
            </form>
        </section>
    );
}
