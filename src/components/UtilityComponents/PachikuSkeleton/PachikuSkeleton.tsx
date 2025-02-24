import React from "react";
import styles from "./PachikuSkeleton.module.css";

export default function PachikuSkeleton() {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.skeletonContainer}>
                <div className={styles.userInfo}>
                    <div className={styles.image}></div>
                    <div className={styles.infoText}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={styles.pachiku} />
            </div>
        </div>
    );
}
