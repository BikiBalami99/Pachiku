import Pachiku from "@/components/APachikuComponents/Pachiku/Pachiku";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { type Comment, Pachiku as PachikuType } from "@prisma/client";
import Link from "next/link";
import styles from "./PachikuPage.module.css";
import AllComments from "@/components/APachikuComponents/AllComments/AllComments";

export default async function PachikuPage({
    params,
}: {
    params: Promise<{ pachikuId: string }>;
}) {
    const { pachikuId } = await params; // Extract pachikuId from params
    const session = await getServerSession();

    if (!session || !session.user) {
        return (
            <section>
                <h2>Please Sign in to view this</h2>
                <Link className="button primaryButton" href="/api/auth/signin">
                    Sign in
                </Link>
            </section>
        );
    }

    const sessionUser = session.user; // May not contain full user details

    const user = await prisma.user.findUnique({
        where: { email: sessionUser.email }, // Fetch full user object
    });

    if (!user) return <div>User not found</div>;

    const pachiku: (PachikuType & { comments: Comment[] }) | null =
        await prisma.pachiku.findUnique({
            where: { id: pachikuId },
            include: { comments: true },
        });

    if (!pachiku) {
        return <div>Pachiku not found</div>;
    }

    return (
        <div className={styles.pachikuPage}>
            <Pachiku user={user} pachiku={pachiku} />
            <AllComments allComments={pachiku.comments} />
        </div>
    );
}
