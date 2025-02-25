"use client";

import { PachikuWithDetails } from "@/types/pachiku";
import { getPachikuOfUser } from "@/utils/getPachiku";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Pachiku from "../MainPachikuComponents/Pachiku/Pachiku";
import styles from "../AllPachikus/AllPachikus.module.css";
import PachikuSkeleton from "../UtilityComponents/SkeletonLoaders/PachikuSkeleton/PachikuSkeleton";

export default function AllUserPachikus({ user }: { user: User }) {
    const [allUserPachikus, setAllUserPachikus] = useState<
        PachikuWithDetails[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getPachikuOfUser(user);
                if (!data || data === null) {
                    throw new Error("Received null");
                }
                setAllUserPachikus(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [user]);

    if (loading) {
        return <PachikuSkeleton />;
    }

    return (
        <ul className={styles.allPachikusList}>
            {allUserPachikus.map((pachiku) => {
                return <Pachiku pachiku={pachiku} key={pachiku.id} />;
            })}
        </ul>
    );
}
