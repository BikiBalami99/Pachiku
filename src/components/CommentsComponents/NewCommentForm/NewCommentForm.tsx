import { createComment } from "@/app/actions";
import { User, type Pachiku as PachikuType } from "@prisma/client";
import { getServerSession } from "next-auth";
import styles from "./NewCommentForm.module.css";
import { getUserByEmail } from "@/utils/getUser";
import UserImage from "@/components/APachikuComponents/UserImage/UserImage";

export default async function NewCommentForm({
    pachiku,
}: {
    pachiku: PachikuType;
}) {
    const session = await getServerSession();
    if (!session || !session.user) return <h3>Please sign in to comment</h3>;

    const currentUser: User = await getUserByEmail(session.user.email);

    if (!currentUser)
        return (
            <div className={styles.commentForm}>
                <h2>Please sign in to comment</h2>
            </div>
        );

    return (
        <form action={createComment} className={styles.commentForm}>
            <input type="hidden" name="pachikuId" value={pachiku.id} />
            <div className={styles.imageAndInput}>
                <UserImage
                    src={currentUser.image}
                    userFirstName={currentUser.firstName}
                />
                <input
                    type="text"
                    name="newComment"
                    id="newComment"
                    placeholder="New Comment"
                    required
                />
            </div>

            <button className="button primaryButton" type="submit">
                Comment
            </button>
        </form>
    );
}
