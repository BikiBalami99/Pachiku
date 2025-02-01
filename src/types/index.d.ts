export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    name?: string | null;
    tweets: Tweet[];
    comments: Comment[];
}

export interface Tweet {
    id: number;
    tweet: string;
    user?: User | null;
    userId?: number | null;
    createdAt: Date;
    likes: number;
    comments: Comment[];
}

export interface Comment {
    id: number;
    comment: string;
    tweet: Tweet;
    tweetId: number;
    user: User;
    userId: number;
    createdAt: Date;
}
