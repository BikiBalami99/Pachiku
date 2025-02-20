"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        setStatus("");

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
        router.push("/api/auth/signin");
    }

    return (
        <form onSubmit={handleSignUp}>
            <label htmlFor="firstname">First Name</label>
            <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Firstname"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="lastname">Last Name</label>
            <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Lastname"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
            />

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
            />
            <div>
                <p>{status}</p>
                <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </div>
        </form>
    );
}
