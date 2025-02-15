import { createComment } from "@/app/actions";
import { type Pachiku as PachikuType } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function NewCommentForm({
    pachiku,
}: {
    pachiku: PachikuType;
}) {
    const session = await getServerSession();
    if (!session || !session.user) return <h3>Please sign in to comment</h3>;

    return (
        <form action={createComment}>
            <input type="hidden" name="pachikuId" value={pachiku.id} />
            <input
                type="text"
                name="newComment"
                id="newComment"
                placeholder="New Comment"
                required
            />
            <button type="submit">Comment</button>
        </form>
    );
}
