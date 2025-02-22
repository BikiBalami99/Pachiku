import NewPachikuForm from "@/components/NewPachikuForm/NewPachikuForm";
import styles from "./page.module.css";
import AllPachikus from "@/components/AllPachikus/AllPachikus";

export default async function Home() {
    return (
        <div className={styles.feed}>
            <NewPachikuForm />
            <AllPachikus />
        </div>
    );
}
