import Link from "next/link";
import styles from "./Navbar.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <nav className={styles.navBar}>
            <Link href="/" className={styles.logo}>
                Twitter
            </Link>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    {session && (
                        <Link href="/api/auth/signout">
                            <button>Sign out</button>
                        </Link>
                    )}
                </li>
                <li>
                    {!session && (
                        <Link href="/api/auth/signin">
                            <button>Sign in</button>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}
