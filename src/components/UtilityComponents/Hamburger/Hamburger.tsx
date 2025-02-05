"use client";

import React, { useState } from "react";
import styles from "./Hamburger.module.css";

type Props = {
    toggleNavBarView: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Hamburger({ toggleNavBarView }: Props) {
    // This isExpanded state determines whether it is an "X" or "="
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleHamburgerIcon() {
        setIsExpanded((prev) => !prev);
        toggleNavBarView((prev) => !prev);
    }

    return (
        <button
            aria-controls="primary-navigation"
            aria-expanded={isExpanded}
            className={styles.hambutton}
            onClick={toggleHamburgerIcon}
        >
            <svg
                fill="none"
                stroke="var(--button-color)"
                className={styles.hamburger}
                viewBox="0 0 100 100"
                width="30px"
            >
                <path
                    d="m 30 40 h 40 a 1 1 0 0 1 0 20 h -40 a 1 1 0 0 1 0 -40 h 40 a 1 1 0 0 1 0 60 h -20 v -40"
                    className={styles.line}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
