import AllComments from "@/components/CommentsComponents/AllComments/AllComments";
import Pachiku from "../Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./PachikuPost.module.css";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/utils/getUser";

export default async function PachikuPost({
    pachiku,
}: {
    pachiku: PachikuWithDetails;
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    // session does not store userId unfortunately
    const user = await getUserByEmail(session.user.email);
    const userId = user.id;
    let userLikesThisPachiku = false;

    if (userId) {
        try {
            const like = await getUserLikesPachiku(userId, pachiku.id);
            userLikesThisPachiku = !!like;
        } catch (error) {
            console.error(
                `Error fetching like status for pachiku ${pachiku.id}:`,
                error
            );
        }
    }

    return (
        <div className={styles.pachikuPost}>
            <Pachiku
                pachiku={pachiku}
                userLikesThisPachiku={userLikesThisPachiku}
            />
            <AllComments pachiku={pachiku} allComments={pachiku.comments} />
        </div>
    );
}
