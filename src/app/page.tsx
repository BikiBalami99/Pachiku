import Feed from "@/components/Feed/Feed";
import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession();
    return (
        <div>
            <Feed />
        </div>
    );
}
