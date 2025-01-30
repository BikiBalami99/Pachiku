import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";

export const metadata: Metadata = {
    title: "Twitter Clone",
    description: "A Twitter clone made with Next.js and Prisma",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />

                {children}
            </body>
        </html>
    );
}
