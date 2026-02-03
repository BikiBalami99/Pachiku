"use client";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	// Check for saved theme preference on mount
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

		if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
			setIsDark(true);
			document.body.classList.add("dark");
		}
	}, []);

	function toggleTheme() {
		setIsDark((prev) => {
			const newValue = !prev;
			if (newValue) {
				document.body.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.body.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
			return newValue;
		});
	}

	return (
		<button
			className={styles.themeToggle}
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			title={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			<svg
				className={`${styles.icon} ${isDark ? styles.hidden : ""}`}
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{/* Moon icon */}
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>
			<svg
				className={`${styles.icon} ${!isDark ? styles.hidden : ""}`}
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{/* Sun icon */}
				<circle cx="12" cy="12" r="5" />
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
				<line x1="1" y1="12" x2="3" y2="12" />
				<line x1="21" y1="12" x2="23" y2="12" />
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
			</svg>
		</button>
	);
}
