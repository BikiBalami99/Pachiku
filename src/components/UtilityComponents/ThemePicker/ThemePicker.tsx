"use client";

import { useEffect, useRef } from "react";
import styles from "./ThemePicker.module.css";

export default function ThemePicker() {
	const selectRef = useRef<HTMLSelectElement>(null);

	// Restore saved preference on mount
	useEffect(() => {
		const saved = localStorage.getItem("theme");
		if (saved && selectRef.current) {
			selectRef.current.value = saved;
			updateTheme(saved);
		}
	}, []);

	function updateTheme(selectedTheme: string) {
		if (selectedTheme === "system") {
			document.documentElement.style.removeProperty("--theme");
		} else {
			document.documentElement.style.setProperty("--theme", selectedTheme);
		}
		localStorage.setItem("theme", selectedTheme);
	}

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const selectedTheme = event.target.value;

		// Use view transition if supported
		if (!document.startViewTransition) {
			updateTheme(selectedTheme);
			return;
		}

		document.startViewTransition(() => {
			updateTheme(selectedTheme);
		});
	}

	return (
		<select
			ref={selectRef}
			id="theme-picker"
			className={styles.themePicker}
			onChange={handleChange}
			defaultValue="system"
			aria-label="Choose theme"
		>
			<option value="system">💻</option>
			<option value="light">☀️</option>
			<option value="dark">🌑</option>
		</select>
	);
}
