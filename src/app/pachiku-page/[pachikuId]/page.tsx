import Pachiku from "@/components/APachikuComponents/Pachiku/Pachiku";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./PachikuPage.module.css";
import AllComments from "@/components/APachikuComponents/AllComments/AllComments";
import { getAuthor } from "@/utils/getAuthor";
import { authOptions } from "@/lib/auth";
import { getSpecificPachiku } from "@/utils/getPachiku";
import { notFound } from "next/navigation";

// Page to view specific pachiku only in one page.
export default async function PachikuPage({
    params,
}: {
    params: Promise<{ pachikuId: string }>;
}) {
    const { pachikuId } = await params; // Extract pachikuId from params
    const session = await getServerSession(authOptions); //Make sure to pass authOptions in getServerSession always

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

    const user = session.user;
    const pachiku = await getSpecificPachiku(pachikuId);
    const author = await getAuthor(pachiku);
    if (!pachiku || !author) {
        notFound();
    }

    return (
        <div className={styles.pachikuPage}>
            <Pachiku author={author} pachiku={pachiku} currentUser={user} />
            <AllComments
                user={user}
                pachiku={pachiku}
                allComments={pachiku.comments}
            />
        </div>
    );
}
