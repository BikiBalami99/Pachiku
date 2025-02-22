"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import styles from "./PachikuModal.module.css";

export default function PachikuModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(true);

    // Show modal when mounted
    useEffect(() => {
        if (dialogRef.current && isOpen) {
            dialogRef.current.showModal();
        }
    }, [isOpen]);

    const handleClose = useCallback(() => {
        dialogRef.current?.close();
        setIsOpen(false);
        redirect("/");
    }, []);

    // Closing the modal on esc keydown
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

    if (!isOpen) return null;

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <button className={styles.closeButton} onClick={handleClose}>
                &#x2794;
            </button>
            {children}
        </dialog>
    );
}
