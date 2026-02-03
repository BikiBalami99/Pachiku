"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import styles from "./ThemePicker.module.css";

type Theme = "system" | "light" | "dark";

const themes: Theme[] = ["system", "light", "dark"];

export default function ThemePicker() {
	const [currentTheme, setCurrentTheme] = useState<Theme>("system");
	const [isAnimating, setIsAnimating] = useState(false);

	// Restore saved preference on mount
	useEffect(() => {
		const saved = localStorage.getItem("theme") as Theme | null;
		if (saved && themes.includes(saved)) {
			setCurrentTheme(saved);
			updateTheme(saved);
		}
	}, []);

	function updateTheme(theme: Theme) {
		if (theme === "system") {
			document.documentElement.style.removeProperty("--theme");
		} else {
			document.documentElement.style.setProperty("--theme", theme);
		}
		localStorage.setItem("theme", theme);
	}

	function cycleTheme() {
		// Trigger animation
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 300);

		// Get next theme
		const currentIndex = themes.indexOf(currentTheme);
		const nextIndex = (currentIndex + 1) % themes.length;
		const nextTheme = themes[nextIndex];

		// Use view transition if supported
		if (!document.startViewTransition) {
			setCurrentTheme(nextTheme);
			updateTheme(nextTheme);
			return;
		}

		document.startViewTransition(() => {
			setCurrentTheme(nextTheme);
			updateTheme(nextTheme);
		});
	}

	// Icon mapping
	const IconComponent = {
		system: Monitor,
		light: Sun,
		dark: Moon,
	}[currentTheme];

	return (
		<button
			className={`${styles.themePicker} ${isAnimating ? styles.animating : ""}`}
			onClick={cycleTheme}
			aria-label={`Current theme: ${currentTheme}. Click to cycle.`}
			title={`Theme: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`}
		>
			<IconComponent className={styles.icon} size={20} strokeWidth={2.5} />
		</button>
	);
}
