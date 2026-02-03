"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Hamburger from "../UtilityComponents/Hamburger/Hamburger";
import LoadingSpinner from "../UtilityComponents/LoadingSpinner/LoadingSpinner";
import ThemeToggle from "../UtilityComponents/ThemeToggle/ThemeToggle";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const { data: session, status } = useSession();
	const [isExpanded, setIsExpanded] = useState(false);
	const [navBarHeight, setNavBarHeight] = useState("4.5rem");
	const pathname = usePathname();

	useEffect(() => {
		if (isExpanded) setNavBarHeight("21.5rem");
		if (!isExpanded) setNavBarHeight("5rem");
		// These are calculated values
	}, [isExpanded]);

	function collapseNavBar() {
		setIsExpanded(false);
	}

	// Helper to check if link is active
	function isActive(path: string) {
		if (path === "/") {
			return pathname === "/" || pathname?.startsWith("/pachiku-page");
		}
		return pathname?.startsWith(path);
	}

	if (status === "loading") {
		return (
			<nav className={styles.navBar}>
				<Link href="/" className={styles.logo} onClick={collapseNavBar}>
					<Image
						src="/logo/logo.webp"
						height={28}
						width={28}
						alt="Pachiku Logo"
						priority
					/>
					<h1 className={styles.heading}>Pachiku</h1>
				</Link>

				<div className={styles.navActions}>
					<ThemeToggle />
					<div className={styles.loadingIcon}>
						<LoadingSpinner />
					</div>
				</div>
			</nav>
		);
	}

	// If user is logged out
	if (!session) {
		return (
			<nav className={styles.navBar}>
				<Link href="/" className={styles.logo} onClick={collapseNavBar}>
					<Image src="/logo/logo.webp" height={28} width={28} alt="Pachiku Logo" />
					<h1 className={styles.heading}>Pachiku</h1>
				</Link>

				<div className={styles.navActions}>
					<ThemeToggle />
					<Link
						className="button primaryButton"
						href="/api/auth/signin"
						onClick={collapseNavBar}
					>
						Sign in
					</Link>
				</div>
			</nav>
		);
	}

	// If user is logged in
	// Order: Hamburger (mobile), Home, Profile, Theme Toggle, Sign Out
	return (
		<nav className={styles.navBar} style={{ height: navBarHeight }}>
			<Link href="/" className={styles.logo} onClick={collapseNavBar}>
				<Image src="/logo/logo.webp" height={28} width={28} alt="Pachiku Logo" priority />
				<h1 className={styles.heading}>Pachiku</h1>
			</Link>
			<ul className={styles.navLinks}>
				<li className={`${styles.icon} ${styles.hamburgerIcon}`}>
					<Hamburger toggleNavBarView={setIsExpanded} />
				</li>
				{/* Home Icon */}
				<li>
					<Link
						className={`${styles.icon} ${isActive("/") ? styles.activeIcon : ""}`}
						href="/"
						onClick={collapseNavBar}
					>
						<Image src="/icons/home-icon.svg" width={20} height={26} alt="Home Icon" />
					</Link>
				</li>
				{/* Profile Icon */}
				<li>
					<Link
						className={`${styles.icon} ${isActive("/dashboard") ? styles.activeIcon : ""}`}
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
				{/* Theme Toggle */}
				<li>
					<ThemeToggle />
				</li>
				{/* Sign Out */}
				{session && (
					<li>
						<Link
							className={styles.icon}
							href="/api/auth/signout"
							onClick={collapseNavBar}
						>
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
