"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Hamburger from "../UtilityComponents/Hamburger/Hamburger";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isExpanded, setIsExpanded] = useState(false);
    const [navBarHeight, setNavBarHeight] = useState("4.5rem");

    useEffect(() => {
        if (isExpanded) setNavBarHeight("21.5rem");
        if (!isExpanded) setNavBarHeight("5rem");
        // These are calculated values
    }, [isExpanded]);

    if (status === "loading") {
        return (
            <nav className={styles.navBar}>
                <Link href="/" className={styles.logo} onClick={collapseNavBar}>
                    <Image
                        src="/logo/logo.webp"
                        height={28}
                        width={28}
                        alt="Pachiku Logo"
                    />
                    <h1 className={styles.heading}>Pachiku</h1>
                </Link>

                <div className={styles.loadingIcon}>
                    <LoadingSpinner />
                </div>
            </nav>
        );
    }

    // If user is logged out
    if (!session) {
        return (
            <nav className={styles.navBar}>
                <Link href="/" className={styles.logo} onClick={collapseNavBar}>
                    <Image
                        src="/logo/logo.webp"
                        height={28}
                        width={28}
                        alt="Pachiku Logo"
                    />
                    <h1 className={styles.heading}>Pachiku</h1>
                </Link>

                <Link
                    style={{ marginTop: "0.25rem" }}
                    className="button primaryButton"
                    href="/api/auth/signin"
                    onClick={collapseNavBar}
                >
                    {/* marginTop: "0.25rem" to center the Sign In button without affect the Logo's position*/}
                    Sign in
                </Link>
            </nav>
        );
    }

    function collapseNavBar() {
        setIsExpanded(false);
    }

    // If user is logged in
    return (
        <nav className={styles.navBar} style={{ height: navBarHeight }}>
            <Link href="/" className={styles.logo} onClick={collapseNavBar}>
                <Image
                    src="/logo/logo.webp"
                    height={28}
                    width={28}
                    alt="Pachiku Logo"
                />
                <h1 className={styles.heading}>Pachiku</h1>
            </Link>
            <ul className={styles.navLinks}>
                <li className={`${styles.icon} ${styles.hamburgerIcon}`}>
                    <Hamburger toggleNavBarView={setIsExpanded} />
                </li>
                <li>
                    <Link
                        className={styles.icon}
                        href="/"
                        onClick={collapseNavBar}
                    >
                        <Image
                            src="/icons/home-icon.svg"
                            width={20}
                            height={26}
                            alt="Home Icon"
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        className={styles.icon}
                        href="/dashboard"
                        onClick={collapseNavBar}
                    >
                        <Image
                            src="/icons/profile-icon.svg"
                            width={14}
                            height={25}
                            alt="Profile Icon"
                        />
                    </Link>
                </li>

                {session && (
                    <li>
                        <Link
                            className={styles.icon}
                            href="/api/auth/signout"
                            onClick={collapseNavBar}
                        >
                            {/* PaddingLeft is set .2rem because the icon looked a bit off */}
                            <Image
                                className={styles.signOutIcon}
                                src="/icons/sign-out-icon.svg"
                                width={25}
                                height={25}
                                alt="Sign Out Icon"
                            />
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
