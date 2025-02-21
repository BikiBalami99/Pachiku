import { getSpecificPachiku } from "@/utils/getPachiku";
import { notFound } from "next/navigation";
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

        // If there is session we can try getting the pachiku details
        const pachiku = await getSpecificPachiku(pachikuId);
        if (pachiku === null) {
            notFound();
            return null; // Ensure the function exits after calling notFound
        }

        return (
            <PachikuModal>
                <PachikuPost pachiku={pachiku} />
            </PachikuModal>
        );
    } catch (error) {
        console.error("Error rendering PachikuPage:", error);
        notFound();
        return null; // Ensure the function exits after calling notFound
    }
}
