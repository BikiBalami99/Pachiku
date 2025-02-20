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

        // If there is session we can tru getting the pachiku details
        const pachiku: PachikuWithDetails = await getSpecificPachiku(pachikuId);
        if (!pachiku) {
            notFound();
        }

        return (
            <PachikuModal>
                <PachikuPost pachiku={pachiku} />
            </PachikuModal>
        );
    } catch (error) {
        console.error("Error rendering PachikuPage:", error);
        notFound();
    }
}
