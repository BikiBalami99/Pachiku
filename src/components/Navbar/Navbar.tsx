"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Hamburger from "../Hamburger/Hamburger";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isExpanded, setIsExpanded] = useState(false);
    const [navBarHeight, setNavBarHeight] = useState("4.5rem");

    useEffect(() => {
        if (isExpanded) setNavBarHeight("23rem");
        if (!isExpanded) setNavBarHeight("5.5rem");
        // These are calculated values
    }, [isExpanded]);

    // If user is logged out
    if (!session) {
        return (
            <nav className={styles.navBar}>
                <Link href="/" className={styles.logo}>
                    <h1 className={styles.heading}>Pachiku</h1>
                </Link>
                <Link
                    className="button secondaryButton"
                    href="/api/auth/signin"
                >
                    Sign in
                </Link>
            </nav>
        );
    }

    // If user is logged in
    return (
        <nav className={styles.navBar} style={{ height: navBarHeight }}>
            <Link href="/" className={styles.logo}>
                <h1 className={styles.heading}>Pachiku</h1>
            </Link>
            <ul className={styles.navLinks}>
                <li className={`${styles.icon} ${styles.hamburgerIcon}`}>
                    <Hamburger toggleNavBarView={setIsExpanded} />
                </li>
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
                        <Link className={styles.icon} href="/api/auth/signout">
                            {/* PaddingLeft is set .2rem because the icon looked a bit off */}
                            <Image
                                style={{ paddingLeft: ".2rem" }}
                                src="/icons/sign-out-icon.svg"
                                width={25}
                                height={20}
                                alt="Home Icon"
                            />
                        </Link>
                    </li>
                )}

                {/* {!session && (
                    <li>
                       
                    </li>
                )} */}
            </ul>
        </nav>
    );
}
