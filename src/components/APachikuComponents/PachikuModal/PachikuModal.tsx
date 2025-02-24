"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

    const closeModal = useCallback(() => {
        setIsOpen(false);
        dialogRef.current?.close();
        router.back();
    }, [router]);

    useEffect(() => {
        const dialog = dialogRef.current;

        function handleEsc(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeModal();
            }
        }

        if (dialog) dialog.addEventListener("keydown", handleEsc);
        return () => {
            if (dialog) dialog.removeEventListener("keydown", handleEsc);
        };
    }, [closeModal]);

    function openModal() {
        setIsOpen(true);
        dialogRef.current?.showModal();
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
