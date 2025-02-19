"use server";
import { getUserByEmail } from "@/utils/getUser";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import AllPachikusList from "@/components/AllPachikusList/AllPachikus";
import UserUpdateForm from "@/components/UserUpdateForm/UserUpdateForm";

export default async function Dashboard() {
    const session = await getServerSession();

    // Authentication
    if (!session || !session.user) {
        redirect("api/auth/signin");
    }

    // Getting full user info as session dont have it all
    const user: User = await getUserByEmail(session.user.email);

    return (
        <section className={styles.dashboardPage}>
            <UserUpdateForm user={user} />
            <h2>Your Pachikus</h2>
            <AllPachikusList user={user} />
        </section>
    );
}
