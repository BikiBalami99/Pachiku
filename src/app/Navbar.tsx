import Link from "next/link";
import styles from "./Navbar.module.css";

export default async function Navbar() {
    return (
        <nav className={styles.navBar}>
            <Link href="/" className={styles.logo}>
                Twitter
            </Link>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
}
