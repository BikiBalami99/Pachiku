import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { userEmail, userPassword, username } = await req.json();

        // Input validation
        if (!userEmail || !userPassword || !username) {
            return NextResponse.json({
                error: "All fields are required",
                status: 400,
            });
        }

        // Finding if the user already exists
        const existingUser: User | null = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        if (existingUser) {
            return NextResponse.json({
                error: "User already exists",
                status: 400,
            });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(userPassword, 12);

        // Creating the new user
        const newUser: User = await prisma.user.create({
            data: {
                email: userEmail,
                password: hashedPassword,
                username,
            },
        });

        return NextResponse.json({
            message: "User created",
            user: newUser,
        });
    } catch (err: any) {
        return NextResponse.json({
            error: "Something went wrong",
            status: 500,
        });
    }
}
