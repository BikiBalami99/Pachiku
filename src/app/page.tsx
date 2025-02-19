import NewPachikuForm from "@/components/NewPachikuForm/NewPachikuForm";
import styles from "./page.module.css";
import AllPachikusList from "@/components/AllPachikusList/AllPachikus";

export default async function Home() {
    return (
        <div className={styles.feed}>
            <NewPachikuForm />
            <AllPachikusList />
        </div>
    );
}
