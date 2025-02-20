import AllComments from "@/components/CommentsComponents/AllComments/AllComments";
import Pachiku from "../Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./PachikuPost.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PachikuPost({
    pachiku,
}: {
    pachiku: PachikuWithDetails;
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div className={styles.pachikuPost}>
            <Pachiku pachiku={pachiku} />
            <AllComments pachiku={pachiku} allComments={pachiku.comments} />
        </div>
    );
}
