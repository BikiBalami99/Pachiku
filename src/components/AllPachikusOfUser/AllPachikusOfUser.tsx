"use client";

import { PachikuWithDetails } from "@/types/pachiku";
import { getPachikuOfUser } from "@/utils/getPachiku";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";

// Sharing the styles from all pachikus cause it needs to look the same anyways.
import styles from "../AllPachikus/AllPachikus.module.css";

export default function AllPachikusOfUser({ user }: { user: User }) {
    const [allPachikusOfUser, setAllPachikusOfUser] = useState<
        PachikuWithDetails[]
    >([]);

    useEffect(() => {
        getPachikuOfUser(user)
            .then((data) => setAllPachikusOfUser(data))
            .catch((error) => console.error(error));
    }, [user]);

    if (allPachikusOfUser.length === 0) {
        return <>No Pachikus yet</>;
    } else if (allPachikusOfUser.length > 0) {
        return (
            <ul className={styles.allPachikus}>
                {allPachikusOfUser.map((pachiku: PachikuWithDetails) => {
                    return <Pachiku pachiku={pachiku} key={pachiku.id} />;
                })}
            </ul>
        );
    }
}
