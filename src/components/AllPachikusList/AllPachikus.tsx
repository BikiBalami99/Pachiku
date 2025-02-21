"use client";

import { useEffect, useState } from "react";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./AllPachikusList.module.css";
import { getAllPachikus, getPachikuOfUser } from "@/utils/getPachiku";
import { User } from "@prisma/client";

interface PachikuListProps {
    user?: User; // Optional: If provided, display Pachikus for this user
}

export default function AllPachikusList({ user }: PachikuListProps) {
    const [pachikus, setPachikus] = useState<PachikuWithDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                let data;
                if (user) {
                    // Fetch Pachikus for a specific user
                    data = await getPachikuOfUser(user);
                } else {
                    // Fetch all Pachikus
                    data = await getAllPachikus();
                }

                if (data === null) {
                    throw new Error("Received null");
                }
                setPachikus(data);
            } catch (error) {
                console.error("Error loading pachiku data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [user]);

    if (loading) {
        return <h2>Loading Pachikus...</h2>;
    }

    if (!Array.isArray(pachikus) || pachikus.length === 0) {
        return <h2>No Pachikus available</h2>;
    }

    return (
        <ul className={styles.allPachikusList}>
            {pachikus.map((pachiku) => (
                <Pachiku key={pachiku.id} pachiku={pachiku} />
            ))}
        </ul>
    );
}
