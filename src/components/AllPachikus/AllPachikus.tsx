"use client";

import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import PachikuSkeleton from "../UtilityComponents/PachikuSkeleton/PachikuSkeleton";
import styles from "./AllPachikus.module.css";
import { usePachikuContext } from "@/contexts/PachikuContext";

export default function AllPachikus() {
    const { allPachikus } = usePachikuContext();

    if (!Array.isArray(allPachikus)) {
        return <h2>No Pachikus available</h2>;
    }

    if (allPachikus.length === 0) {
        return <PachikuSkeleton />;
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
