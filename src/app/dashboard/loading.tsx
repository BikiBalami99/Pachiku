import UserUpdateFormSkeleton from "@/components/UtilityComponents/SkeletonLoaders/UserUpdateFormSkeleton/UserUpdateFormSkeleton";
import styles from "./page.module.css";
import PachikuSkeleton from "@/components/UtilityComponents/SkeletonLoaders/PachikuSkeleton/PachikuSkeleton";

export default function loading() {
    return (
        <section className={styles.dashboardPage}>
            <UserUpdateFormSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
        </section>
    );
}
