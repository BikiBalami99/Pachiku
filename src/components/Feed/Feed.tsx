import AllPachikus from "../AllPachikus/AllPachikus";
import NewPachikuForm from "../NewPachikuForm/NewPachikuForm";
import styles from "./Feed.module.css";

export default function Feed() {
    return (
        <div className={styles.feed}>
            <NewPachikuForm />
            <AllPachikus />
        </div>
    );
}
