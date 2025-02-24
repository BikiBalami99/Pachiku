import styles from "./UserUpdateFormSkeleton.module.css";

export default function UserUpdateFormSkeleton() {
    return (
        <div className={styles.dashboardForm}>
            <div className={styles.imageSkeleton}></div>
            <div className={styles.formSkeleton}>
                <div className={styles.firstRowSkeleton}>
                    <div className={styles.inputSkeleton}></div>
                    <div className={styles.inputSkeleton}></div>
                </div>
                <div className={styles.inputSkeleton}></div>
                <div className={styles.buttonSkeleton}></div>
            </div>
        </div>
    );
}
