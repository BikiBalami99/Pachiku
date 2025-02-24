"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./loading.module.css";

export default function loading() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        openModal();
    }, []);

    function openModal() {
        setIsOpen(true);
        dialogRef.current?.showModal();
    }

    function closeModal() {
        setIsOpen(false);
        dialogRef.current?.close();
    }
    return (
        <dialog className={styles.modal} ref={dialogRef}>
            <form method="dialog">
                <button
                    className={styles.closeButton}
                    onClick={closeModal}
                    aria-label="Close"
                >
                    &#x2794;
                </button>
            </form>
            <div className={styles.head}></div>
            <div className={styles.body}></div>
        </dialog>
    );
}
