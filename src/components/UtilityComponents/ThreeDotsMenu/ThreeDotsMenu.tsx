"use client";

import React, { useState } from "react";

import styles from "./ThreeDotsMenu.module.css";

// ALWAYS use this inside a container with the css, position absolute where you want to put this component

export default function ThreeDotsMenu({
    actionForEdit,
    actionForDelete,
}: {
    actionForEdit: () => void;
    actionForDelete: () => void;
}) {
    const [fullMenuVisibility, setFullMenuVisibility] = useState(false);

    function toggleFullMenuVisibility() {
        setFullMenuVisibility((prev) => !prev);
    }

    function onClickEdit() {
        actionForEdit();
        setFullMenuVisibility(false);
    }

    return (
        <div>
            <div
                onClick={toggleFullMenuVisibility}
                className={styles.threeDotsMenu}
            >
                <span>&bull;</span>
                <span>&bull;</span>
                <span>&bull;</span>
            </div>
            <div
                data-visibility={fullMenuVisibility ? "visible" : "invisible"}
                className={styles.fullMenu}
            >
                <div className={styles.editButton} onClick={onClickEdit}>
                    Edit
                </div>
                <div onClick={actionForDelete}>Delete</div>
            </div>
        </div>
    );
}
