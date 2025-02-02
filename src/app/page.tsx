import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession();
    return (
        <div>
            Main Page
            <h1>Server Session</h1>
            <p>{JSON.stringify(session)}</p>
        </div>
    );
}
