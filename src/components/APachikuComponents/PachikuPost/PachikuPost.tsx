import AllComments from "@/components/CommentsComponents/AllComments/AllComments";
import Pachiku from "../Pachiku/Pachiku";
import { PachikuWithDetails } from "@/types/pachiku";

export default function PachikuPost({
    pachiku,
}: {
    pachiku: PachikuWithDetails;
}) {
    return (
        <>
            <Pachiku pachiku={pachiku} />
            <AllComments pachiku={pachiku} allComments={pachiku.comments} />
        </>
    );
}
