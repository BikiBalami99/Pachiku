"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthButton() {
    const { status } = useSession();
    const [buttonText, setButtonText] = useState<string>("Sign In");

    function handleClick() {
        if (status === "unauthenticated") {
            signIn();
        } else if (status === "loading") {
            return;
        } else if (status === "authenticated") {
            signOut();
        }
    }

    useEffect(() => {
        if (status === "unauthenticated") {
            setButtonText("Sign In");
        } else if (status === "loading") {
            setButtonText("...");
        } else if (status === "authenticated") {
            setButtonText("Sign Out");
        }
    }, [status]);

    return (
        <button
            onClick={handleClick}
            aria-label={buttonText}
            disabled={status === "loading"}
        >
            {buttonText}
        </button>
    );
}
