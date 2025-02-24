import PachikuFormSkeleton from "@/components/UtilityComponents/PachikuFormSkeleton/PachikuFormSkeleton";
import PachikuSkeleton from "@/components/UtilityComponents/PachikuSkeleton/PachikuSkeleton";
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
