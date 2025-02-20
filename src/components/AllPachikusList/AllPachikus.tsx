"use client";

import { useEffect, useState } from "react";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./AllPachikusList.module.css";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/contexts/UserContext";
import { getAllPachikuData } from "@/utils/getAllPachikuData";
import { getPachikuOfUser } from "@/utils/getPachiku";
import { User } from "@prisma/client";

interface PachikuListProps {
    user?: User; // Optional: If provided, display Pachikus for this user
}

export default function AllPachikusList({ user }: PachikuListProps) {
    const { data: session } = useSession();
    const { user: currentUser } = useUserContext();
    const [pachikus, setPachikus] = useState<PachikuWithDetails[]>([]);
    const [userLikes, setUserLikes] = useState<{
        [pachikuId: string]: boolean;
    }>({});
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
                    data = await getAllPachikuData(currentUser);
                }

                setPachikus(data.pachikus);
                setUserLikes(data.userLikes);
            } catch (error) {
                console.error("Error loading pachiku data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user, currentUser]);

    // if (!currentUser) {
    //     return <h2>Please sign in</h2>;
    // }

    // if (!session || !currentUser) {
    //     return <h2>Please sign in</h2>;
    // }

    if (loading) {
        return <h2>Loading Pachikus...</h2>;
    }

    if (!pachikus || pachikus.length === 0) {
        return <h2>No Pachikus available</h2>;
    }

    return (
        <ul className={styles.allPachikusList}>
            {pachikus.map((pachiku) => (
                <Pachiku
                    key={pachiku.id}
                    pachiku={pachiku}
                    userLikesThisPachiku={userLikes[pachiku.id] || false}
                />
            ))}
        </ul>
    );
}
