import styles from "./PachikuFormSkeleton.module.css";

export default function PachikuFormSkeleton() {
    return (
        <div className={styles.pachikuFormSkeleton}>
            <div className={styles.imageAndForm}>
                <div className={styles.image}></div>
                <div className={styles.inputForm}></div>
            </div>
            <div className={styles.button}></div>
        </div>
    );
}
