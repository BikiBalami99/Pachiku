import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "./AuthProvider";
import { UserProvider } from "@/contexts/UserContext";
import styles from "./layout.module.css";

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
                        <Navbar />
                        <main className={styles.main}>
                            {children}
                            {modal}
                        </main>
                    </UserProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
