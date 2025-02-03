import Link from "next/link";
import styles from "./Navbar.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <nav className={styles.navBar}>
            <Link href="/" className={styles.logo}>
                <h1 className={styles.heading}>Pickiku Pachiku</h1>
            </Link>
            <ul className={styles.navLinks}>
                <li>
                    <Link className={styles.icon} href="/">
                        <Image
                            src="/icons/home-icon.svg"
                            width={20}
                            height={26}
                            alt="Home Icon"
                        />
                    </Link>
                </li>
                <li>
                    <Link className={styles.icon} href="/dashboard">
                        <Image
                            src="/icons/profile-icon.svg"
                            width={14}
                            height={25}
                            alt="Home Icon"
                        />
                    </Link>
                </li>

                {session && (
                    <li>
                        <Link
                            className="button secondaryButton"
                            href="/api/auth/signout"
                        >
                            Sign out
                        </Link>
                    </li>
                )}

                {!session && (
                    <li>
                        <Link
                            className="button secondaryButton"
                            href="/api/auth/signin"
                        >
                            Sign in
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
