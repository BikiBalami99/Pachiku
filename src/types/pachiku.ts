// types/pachiku.ts
import { type Pachiku as PrismaPachiku, Comment, User } from "@prisma/client";

// I made this type because, when directly importing type Pachiku, it did not include the comments and user in there because its relational data.
export type PachikuWithDetails = PrismaPachiku & {
    comments: Comment[]; // Include comments
    user: User; // Include user who created the Pachiku
};
