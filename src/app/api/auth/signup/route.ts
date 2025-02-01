import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { type User } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { firstName, lastName, username, email, password, dateOfBirth } =
            await req.json();

        // Input validation
        if (
            !firstName ||
            !lastName ||
            !username ||
            !email ||
            !password ||
            !dateOfBirth
        ) {
            return NextResponse.json({
                error: "All fields are required",
                status: 400,
            });
        }

        // Finding if the user already exists
        const existingUser: User | null = await prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return NextResponse.json({
                error: "User already exists",
                status: 400,
            });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Creating the new user
        const newUser: User = await prisma.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword,
                dateOfBirth: new Date(dateOfBirth),
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
