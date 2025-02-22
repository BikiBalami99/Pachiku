import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "./AuthProvider";
import { UserProvider } from "@/contexts/UserContext";
import styles from "./layout.module.css";
import { PachikuProvider } from "@/contexts/PachikuContext";

export const metadata: Metadata = {
    title: "Twitter Clone",
    description: "A Twitter clone made with Next.js and Prisma",
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <UserProvider>
                        <PachikuProvider>
                            <Navbar />
                            <main className={styles.main}>
                                {modal}
                                {children}
                            </main>
                        </PachikuProvider>
                    </UserProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
