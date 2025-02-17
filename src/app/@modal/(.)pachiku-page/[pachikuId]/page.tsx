import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./PachikuPage.module.css";
import { authOptions } from "@/lib/auth";
import { getSpecificPachiku } from "@/utils/getPachiku";
import { notFound } from "next/navigation";
import { PachikuWithDetails } from "@/types/pachiku";
import PachikuPost from "@/components/APachikuComponents/PachikuPost/PachikuPost";
import PachikuModal from "@/components/APachikuComponents/PachikuModal/PachikuModal";

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
                <PachikuModal>
                    <section>
                        <h2>Please Sign in to view this</h2>
                        <Link
                            className="button primaryButton"
                            href="/api/auth/signin"
                        >
                            Sign in
                        </Link>
                    </section>
                </PachikuModal>
            );
        }

        // If there is session we can tru getting the pachiku details
        const pachiku: PachikuWithDetails = await getSpecificPachiku(pachikuId);
        if (!pachiku) {
            notFound();
        }

        return (
            <PachikuModal>
                <div className={styles.pachikuPage}>
                    <PachikuPost pachiku={pachiku} />
                </div>
            </PachikuModal>
        );
    } catch (error) {
        console.error("Error rendering PachikuPage:", error);
        notFound();
    }
}
