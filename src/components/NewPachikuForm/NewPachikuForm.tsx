"use client";

import { useState } from "react";
import styles from "./NewPachikuForm.module.css";
import UserImage from "../APachikuComponents/UserImage/UserImage";
import SignUpForm from "../SignUpForm/SignUpForm";
import { useSession } from "next-auth/react";
import { submitPachiku } from "./submitPachiku";
import { redirect } from "next/navigation";
import { usePachikuContext } from "@/contexts/PachikuContext";
import { useRouter } from "next/navigation";

export default function NewPachikuForm() {
    const [feedback, setFeedback] = useState<string | null>(null);
    const { data: session } = useSession();
    const { refreshPachikuData } = usePachikuContext();
    const router = useRouter();

    if (!session || !session.user) {
        return (
            <div className={styles.notSignedInNotice}>
                <SignUpForm />
            </div>
        );
    }
    const { user } = session;
    const userAvatarLink = user.image || "/icons/no-avatar-icon.svg";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await submitPachiku(formData);
        if (response.error) {
            setFeedback(response.error);
        } else if (response.success) {
            setFeedback("Pachiku submitted successfully!");
            // Call the revalidation API route
            await fetch("/api/revalidate", {
                method: "POST",
            });
            // Refresh the data in PachikuContext
            refreshPachikuData();
            router.refresh();
            router.push(`/pachiku-page/${response.data}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.newPachikuForm}>
            <div className={styles.imageAndForm}>
                <UserImage
                    src={userAvatarLink}
                    userFirstName={"current user"}
                />
                <textarea
                    name="newPachiku"
                    id="newPachiku"
                    defaultValue=""
                    placeholder="How was your day?"
                    className={styles.inputForm}
                    maxLength={256}
                    required
                />
            </div>
            <div className={styles.feedbackAndButton}>
                {feedback && <p>{feedback}</p>}
                <button className="button primaryButton" type="submit">
                    Pachiku
                </button>
            </div>
        </form>
    );
}
