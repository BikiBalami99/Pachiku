import { getSpecificPachiku } from "@/utils/getPachiku";
import { notFound } from "next/navigation";
import { PachikuWithDetails } from "@/types/pachiku";
import PachikuPost from "@/components/APachikuComponents/PachikuPost/PachikuPost";

// Page to view specific pachiku only in one page.
export default async function PachikuPage({
    params,
}: {
    params: Promise<{ pachikuId: string }>;
}) {
    try {
        const { pachikuId } = await params; // Extract pachikuId from paramss

        // If there is session we can tru getting the pachiku details
        const pachiku: PachikuWithDetails = await getSpecificPachiku(pachikuId);
        if (!pachiku) {
            notFound();
        }
        return <PachikuPost pachiku={pachiku} />;
    } catch (error) {
        console.error("Error rendering PachikuPage:", error);
        notFound();
    }
}
