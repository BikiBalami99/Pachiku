"use client";

import { type User, Pachiku as PachikuType } from "@prisma/client";
import { useState } from "react";

export default function NewCommentForm({
    user,
    pachiku,
}: {
    user: User;
    pachiku: PachikuType;
}) {
    const [newComment, setNewComment] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newComment: newComment,
                userId: user.id,
                pachikuId: pachiku.id,
            }),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Comment</button>
        </form>
    );
}
