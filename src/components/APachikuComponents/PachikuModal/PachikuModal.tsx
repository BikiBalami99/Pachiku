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
        dialogRef.current?.close();
        router.back();
    };

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <button onClick={handleClose}>&times;</button>
            {children}
        </dialog>
    );
}
