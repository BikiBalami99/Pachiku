import { getSpecificPachiku } from "@/utils/getPachiku";
import { notFound } from "next/navigation";
import PachikuPost from "@/components/MainPachikuComponents/PachikuPost/PachikuPost";
import PachikuModal from "@/components/MainPachikuComponents/PachikuModal/PachikuModal";

// Page to view specific pachiku only in one page.
export default async function PachikuPage({
    params,
}: {
    params: Promise<{ pachikuId: string }>;
}) {
    try {
        const { pachikuId } = await params; // Extract pachikuId from params

        // If there is session we can try getting the pachiku details
        const pachiku = await getSpecificPachiku(pachikuId);
        if (pachiku === null) {
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
