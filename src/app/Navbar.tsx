import Link from "next/link";
import styles from "./Navbar.module.css";
// import AuthButton from "@/components/Buttons/AuthButton";

export default function Navbar() {
    return (
        <nav className={styles.navBar}>
            <Link href="/" className={styles.logo}>
                Twitter
            </Link>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>{/* <AuthButton /> */}</li>
            </ul>
        </nav>
    );
}
