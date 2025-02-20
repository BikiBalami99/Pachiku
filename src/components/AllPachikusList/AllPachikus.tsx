"use client";

import { useEffect, useState } from "react";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./AllPachikusList.module.css";
import { useUserContext } from "@/contexts/UserContext";
import { getAllPachikus, getPachikuOfUser } from "@/utils/getPachiku";
import { User } from "@prisma/client";

interface PachikuListProps {
    user?: User; // Optional: If provided, display Pachikus for this user
}

export default function AllPachikusList({ user }: PachikuListProps) {
    // This is used in either the homepage or the dashboard.
    // If user is provided, in the dashboard the pachiku of only the user
    // Else all pachikus in feed

    const { user: currentUser } = useUserContext();
    const [pachikus, setPachikus] = useState<PachikuWithDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                let data;
                if (user) {
                    // Fetch Pachikus for a specific user
                    data = await getPachikuOfUser(user, currentUser!);
                } else {
                    // Fetch all Pachikus
                    data = await getAllPachikus();
                }
                setPachikus(data);
            } catch (error) {
                console.error("Error loading pachiku data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [user, currentUser]);

    if (loading) {
        return <h2>Loading Pachikus...</h2>;
    }

    if (!pachikus || pachikus.length === 0) {
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
