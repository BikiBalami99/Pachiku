"use client";

import { useRef, useState } from "react";
import styles from "./LikeCommentShareComponents.module.css";

type ShareIconProps = {
    pachikuId: string;
};

export default function ShareIcon({ pachikuId }: ShareIconProps) {
    const [showCopied, setShowCopied] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    async function handleClick() {
        const thisPachikuLink = `${window.location.origin}/pachiku-page/${pachikuId}`;

        try {
            await navigator.clipboard.writeText(thisPachikuLink);
            setShowCopied(true);

            // Clear any existing timeout
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            // Set a new timeout
            timeoutRef.current = setTimeout(() => setShowCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    }

    return (
        <div className={styles.container} style={{ position: "relative" }}>
            {/* Setting that relative to position the link copied relative to it. */}
            <div
                className={styles.linkCopiedAlert}
                style={{ opacity: `${showCopied ? "1" : "0"}` }}
            >
                Link copied!
            </div>
            <svg
                onClick={handleClick}
                width="25"
                height="23"
                viewBox="0 0 25 23"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.shareIcon}
                role="img"
                aria-label="Share Icon"
            >
                <path d="M1 13V20.1579C1.11616 20.7719 1.62727 22 2.74242 22C3.85758 22 16.2172 22 22.2576 22C22.8384 21.8772 24 21.3368 24 20.1579C24 18.9789 24 16.193 24 13M12.5 17.2105V1M12.5 1L19.1212 6.89474M12.5 1L5.5303 6.89474" />
            </svg>
            <span className={styles.span}>Share</span>
        </div>
    );
}
