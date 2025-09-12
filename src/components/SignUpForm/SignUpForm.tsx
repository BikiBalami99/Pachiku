"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./SignUpForm.module.css";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSignUp(formData: FormData) {
		setLoading(true);
		setStatus("Signin Up..");

		const username = formData.get("username");
		const firstName = formData.get("firstname");
		const lastName = formData.get("lastname");
		const password = formData.get("password");

		if (!username || !firstName || !lastName || !password) {
			setStatus("All fields are required.");
			setLoading(false);
			return;
		}

		const response = await fetch(`/api/sign-up`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				firstName: firstName.toString(),
				lastName: lastName.toString(),
				username: username.toString(),
				password: password.toString(),
			}),
		});

		setLoading(false);

		if (!response.ok) {
			setStatus("Could not sign up. Please try again.");
			return;
		}

		setStatus("Signed up successfully.");

		if (response.ok) {
			// Automatically signing in the user with that info

			const signInResponse = await signIn("credentials", {
				redirect: false,
				username: username.toString(),
				password: password.toString(),
			});

			if (signInResponse?.ok) {
				router.push("/");
			} else {
				setStatus("Could not sign in automatically, please try manually.");
			}
		}
	}

	return (
		<form action={handleSignUp} className={styles.compactSignUpForm}>
			{/* Header */}
			<div className={styles.header}>
				<h1 className={styles.title}>Sign Up</h1>
				<p className={styles.subtitle}>Create your account to get started</p>
			</div>

			{/* Input Grid - 2x2 layout */}
			<div className={styles.inputGrid}>
				<div className={styles.inputField}>
					<label htmlFor="firstname">First Name</label>
					<input
						type="text"
						name="firstname"
						id="firstname"
						placeholder="John"
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className={styles.inputForm}
					/>
				</div>
				<div className={styles.inputField}>
					<label htmlFor="lastname">Last Name</label>
					<input
						type="text"
						name="lastname"
						id="lastname"
						placeholder="Doe"
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className={styles.inputForm}
					/>
				</div>
				<div className={styles.inputField}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						placeholder="johndoe"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete="off"
						className={styles.inputForm}
					/>
				</div>
				<div className={styles.inputField}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="off"
						className={styles.inputForm}
					/>
				</div>
			</div>

			{/* Action Buttons */}
			<div className={styles.actionsRow}>
				<button className={styles.primaryButton} type="submit" disabled={loading}>
					{loading ? status : "Sign Up"}
				</button>
			</div>

			{/* Status Message */}
			{status && <div className={styles.status}>{status}</div>}

			{/* Divider */}
			<hr className={styles.divider} />

			{/* Google Sign In */}
			<Link className={styles.googleSignIn} href="/api/auth/signin">
				<Image
					src="/icons/google_Icons.webp"
					alt="Google logo"
					height={16}
					width={16}
					className={styles.googleIcon}
				/>
				Sign in with Google
			</Link>
		</form>
	);
}
