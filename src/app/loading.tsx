import PachikuFormSkeleton from "@/components/UtilityComponents/SkeletonLoaders/PachikuFormSkeleton/PachikuFormSkeleton";
import PachikuSkeleton from "@/components/UtilityComponents/SkeletonLoaders/PachikuSkeleton/PachikuSkeleton";
import styles from "./page.module.css";

export default function Loading() {
    return (
        <div className={styles.loadingContaier}>
            <PachikuFormSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
            <PachikuSkeleton />
        </div>
    );
}
