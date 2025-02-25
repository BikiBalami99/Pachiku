"use client";
import { useEffect, useRef } from "react";
import styles from "./loading.module.css";

export default function Loading() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        openModal();
    }, []);

    function openModal() {
        dialogRef.current?.showModal();
    }

    function closeModal() {
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
