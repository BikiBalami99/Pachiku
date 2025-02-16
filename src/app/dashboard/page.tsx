"use server";
import { getUserByEmail } from "@/utils/getUser";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashBoardForm from "@/components/DashBoardForm/DashBoardForm";
// import styles from "./page.module.css";

export default async function Dashboard() {
    const session = await getServerSession();

    // Authentication
    if (!session || !session.user) {
        redirect("api/auth/signin");
    }

    // Getting full user info as session dont have it all
    const user: User = await getUserByEmail(session.user.email);

    return <DashBoardForm user={user} />;
}
