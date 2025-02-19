"use client";

import { useEffect, useState } from "react";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { useSession } from "next-auth/react";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./AllPachikus.module.css";
import { useUserContext } from "@/contexts/UserContext";
import { getAllPachikuData } from "@/utils/getAllPachikuData";

export default function AllPachikus() {
    const { data: session } = useSession();
    const { user: currentUser } = useUserContext();
    const [allPachikus, setAllPachikus] = useState<PachikuWithDetails[]>([]);
    const [userLikes, setUserLikes] = useState<{
        [pachikuId: string]: boolean;
    }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const { pachikus, userLikes } = await getAllPachikuData(
                    currentUser
                ); 
                setAllPachikus(pachikus);
                setUserLikes(userLikes);
            } catch (error) {
                console.error("Error loading pachiku data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [currentUser]);

    if (!session || !currentUser) {
        return <h2>Please sign in</h2>;
    }

    if (loading) {
        return <h2>Loading Pachikus...</h2>;
    }

    if (!allPachikus || allPachikus.length === 0) {
        return <h2>No Pachikus available</h2>;
    }

    return (
        <ul className={styles.allPachikus}>
            {allPachikus.map((pachiku) => (
                <Pachiku
                    key={pachiku.id}
                    pachiku={pachiku}
                    userLikesThisPachiku={userLikes[pachiku.id] || false}
                />
            ))}
        </ul>
    );
}
