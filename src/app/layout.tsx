import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "./AuthProvider";
import { UserProvider } from "@/contexts/UserContext";

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
                <AuthProvider>
                    <UserProvider>
                        <Navbar />
                        {children}
                    </UserProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
