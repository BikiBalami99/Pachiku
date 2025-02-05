import Feed from "@/components/Feed/Feed";
import LeftPanel from "@/components/LeftPanel/LeftPanel";
import RightPanel from "@/components/RightPanel/RightPanel";
import styles from "./page.module.css";

export default async function Home() {
    return (
        <main className={styles.main}>
            <LeftPanel />
            <Feed />
            <RightPanel />
        </main>
    );
}
