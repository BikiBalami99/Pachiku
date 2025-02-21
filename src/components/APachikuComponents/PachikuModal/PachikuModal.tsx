"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./PachikuModal.module.css";

export default function PachikuModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Show modal when mounted
    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.classList.add(styles.close);
            dialogRef.current.addEventListener(
                "animationend",
                () => {
                    dialogRef.current?.close();
                    router.back();
                },
                { once: true }
            );
        }
    };

    // Closing the modal on esp keydown
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [handleClose]);

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <button className={styles.closeButton} onClick={handleClose}>
                &#x2794;
            </button>
            {children}
        </dialog>
    );
}
