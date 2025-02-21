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

    async function handleSignUp(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);
        setStatus("Signin Up..");

        const formData = new FormData(event.target as HTMLFormElement);
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
                setStatus(
                    "Could not sign in automatically, please try manually."
                );
            }
        }
    }

    return (
        <form onSubmit={handleSignUp} className={styles.signUpForm}>
            <div className={styles.inputFields}>
                <div className={styles.inputAndLabel}>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Firstname"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.inputForm}
                    />
                </div>
                <div className={styles.inputAndLabel}>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Lastname"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.inputForm}
                    />
                </div>
            </div>
            <div className={styles.inputFields}>
                <div className={styles.inputAndLabel}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        className={styles.inputForm}
                    />
                </div>
                <div className={styles.inputAndLabel}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        className={styles.inputForm}
                    />
                </div>
            </div>

            <div className={styles.feedbackAndButton}>
                <button
                    className="button primaryButton"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? status : "Sign up"}
                </button>
                <p>
                    We wont store your email for security reasons, but password
                    recovery will be impossible.
                </p>
                <hr className={styles.horizontalLine} />
                <Link
                    className={`button primaryButton ${styles.googleButton}`}
                    href="/api/auth/signin"
                >
                    <Image
                        src="/icons/google_Icons.webp"
                        alt="Google logo"
                        height={24}
                        width={24}
                    />
                    <p>Sign in with Google</p>
                </Link>
                <p>
                    No Sign up required. Your email will be stored in our
                    database.
                </p>
            </div>
        </form>
    );
}
