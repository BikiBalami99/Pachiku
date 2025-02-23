"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PachikuModal.module.css";
import { useRouter } from "next/navigation";

export default function PachikuModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    useEffect(() => {
        dialogRef.current?.showModal();
    }, [isOpen]);

    function handleClose() {
        dialogRef.current?.close();
        router.back();
    }

    console.log("IsOpen:", isOpen);

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <form method="dialog">
                <button className={styles.closeButton} onClick={handleClose}>
                    &#x2794;
                </button>
            </form>
            {children}
        </dialog>
    );
}
