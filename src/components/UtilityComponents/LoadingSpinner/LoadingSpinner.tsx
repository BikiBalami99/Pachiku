"use client";

import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
    return (
        <div className={styles.spinner}>
            <svg
                fill="none"
                stroke="var(--button-color)"
                className={styles.hamburger}
                viewBox="0 0 100 100"
                width="30px"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="20"
                    className={styles.line}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
