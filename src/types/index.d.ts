export interface User {
    id: string;
    username: string;
    email: string;
    tweets: Tweet[];
    comments: Comment[];
    oauthProvider?: string | null;
    oauthProviderId?: string | null;
}

export interface Tweet {
    id: string;
    tweet: string;
    user?: User | null;
    userId?: string | null;
    createdAt: Date;
    likes?: number;
    comments?: Comment[];
}

export interface Comment {
    id: string;
    comment: string;
    tweet: Tweet;
    tweetId: string;
    user: User;
    userId: string;
    createdAt: Date;
}
