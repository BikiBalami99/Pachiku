"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PachikuModal.module.css";
import { useRouter } from "next/navigation";

export default function PachikuModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        openModal();
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) dialogRef.current?.addEventListener("keydown", handleEsc);
        return () => {
            dialogRef.current?.removeEventListener("keydown", handleEsc);
        };
    }, [handleEsc]);

    function handleEsc(event: KeyboardEvent) {
        if (event.key === "Escape") {
            closeModal();
        }
    }

    function openModal() {
        setIsOpen(true);
        dialogRef.current?.showModal();
    }

    function closeModal() {
        setIsOpen(false);
        dialogRef.current?.close();
        router.back();
    }

    return (
        <dialog ref={dialogRef} className={styles.modal} open={isOpen}>
            <form method="dialog">
                <button
                    className={styles.closeButton}
                    onClick={closeModal}
                    aria-label="Close"
                >
                    &#x2794;
                </button>
            </form>
            {children}
        </dialog>
    );
}
