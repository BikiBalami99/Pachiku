import AllComments from "@/components/CommentsComponents/AllComments/AllComments";
import Pachiku from "../Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import styles from "./PachikuPost.module.css";

export default function PachikuPost({
    pachiku,
}: {
    pachiku: PachikuWithDetails;
}) {
    return (
        <div className={styles.pachikuPost}>
            <Pachiku pachiku={pachiku} />
            <AllComments pachiku={pachiku} allComments={pachiku.comments} />
        </div>
    );
}
