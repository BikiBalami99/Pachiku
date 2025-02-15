import Pachiku from "@/components/APachikuComponents/Pachiku/Pachiku";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./PachikuPage.module.css";
import AllComments from "@/components/CommentsComponents/AllComments/AllComments";
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
    try {
        const { pachikuId } = await params; // Extract pachikuId from params
        const session = await getServerSession(authOptions); //Make sure to pass authOptions in getServerSession always

        if (!session || !session.user) {
            return (
                <section>
                    <h2>Please Sign in to view this</h2>
                    <Link
                        className="button primaryButton"
                        href="/api/auth/signin"
                    >
                        Sign in
                    </Link>
                </section>
            );
        }

        const pachiku = await getSpecificPachiku(pachikuId);
        const author = await getAuthor(pachiku);
        if (!pachiku || !author) {
            notFound();
        }

        return (
            <div className={styles.pachikuPage}>
                <Pachiku pachiku={pachiku} />
                <AllComments pachiku={pachiku} allComments={pachiku.comments} />
            </div>
        );
    } catch (error) {
        console.error("Error rendering PachikuPage:", error);
        notFound();
    }
}
