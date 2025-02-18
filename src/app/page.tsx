import AllPachikus from "@/components/AllPachikus/AllPachikus";
import NewPachikuForm from "@/components/NewPachikuForm/NewPachikuForm";
import styles from "./page.module.css";

export default async function Home() {
    return (
        <div className={styles.feed}>
            <NewPachikuForm />
            <AllPachikus />
        </div>
    );
}
