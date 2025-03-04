"use client";

import { useState } from "react";
import styles from "./NewPachikuForm.module.css";
import UserImage from "../MainPachikuComponents/UserImage/UserImage";
import SignUpForm from "../SignUpForm/SignUpForm";
import { useSession } from "next-auth/react";
import { submitPachiku } from "./submitPachiku";
import { usePachikuContext } from "@/contexts/PachikuContext";
import { useRouter } from "next/navigation";
import PachikuFormSkeleton from "../UtilityComponents/SkeletonLoaders/PachikuFormSkeleton/PachikuFormSkeleton";

export default function NewPachikuForm() {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [newPachiku, setNewPachiku] = useState("");
    const { data: session, status } = useSession();
    const { refreshPachikuData } = usePachikuContext();
    const router = useRouter();

    if (status === "loading") {
        return <PachikuFormSkeleton />;
    }

    if (!session || !session.user) {
        return <SignUpForm />;
    }
    const { user } = session;
    const userAvatarLink = user.image || "/icons/no-avatar-icon.svg";

    async function handleSubmit(formData: FormData) {
        const response = await submitPachiku(formData);
        if (response.error) {
            setFeedback("Something went wrong, please try again.");
        } else if (response.success) {
            setFeedback("Pachiku submitted successfully!");
            setNewPachiku("");
            setTimeout(() => {
                setFeedback("");
            }, 5000);
            refreshPachikuData();
            router.push(`/pachiku-page/${response.data}`);
        }
    }

    return (
        <form action={handleSubmit} className={styles.newPachikuForm}>
            <div className={styles.imageAndForm}>
                <UserImage
                    src={userAvatarLink}
                    userFirstName={"current user"}
                />
                <textarea
                    name="newPachiku"
                    id="newPachiku"
                    value={newPachiku}
                    onChange={(e) => setNewPachiku(e.target.value)}
                    placeholder="How was your day?"
                    className={styles.inputForm}
                    maxLength={256}
                    required
                />
            </div>
            <div className={styles.feedbackAndButton}>
                <p className={styles.feedback} data-visible={!!feedback}>
                    {feedback}
                </p>
                <button className="button primaryButton" type="submit">
                    Pachiku
                </button>
            </div>
        </form>
    );
}
