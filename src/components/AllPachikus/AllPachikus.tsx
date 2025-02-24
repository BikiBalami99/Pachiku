"use client";

import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import PachikuSkeleton from "../UtilityComponents/PachikuSkeleton/PachikuSkeleton";
import styles from "./AllPachikus.module.css";
import { usePachikuContext } from "@/contexts/PachikuContext";

export default function AllPachikus() {
    const { allPachikus, loading } = usePachikuContext();

    if (loading) {
        return <PachikuSkeleton />;
    }
    if (!Array.isArray(allPachikus) || allPachikus.length === 0) {
        return <h2>No one's pachiku yet.</h2>;
    }

    return (
        <>
            <ul className={styles.allPachikusList}>
                {allPachikus.map((pachiku) => (
                    <Pachiku key={pachiku.id} pachiku={pachiku} />
                ))}
            </ul>
        </>
    );
}
