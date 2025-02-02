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

        console.log("Checking if user already exists");

        // Finding if the user already exists
        const existingUser = await prisma.user.findFirst({
            where: { email: email },
        });

        console.log("User check completed");

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

        console.log("New user created:", newUser);

        return NextResponse.json(
            {
                message: "User created",
                user: newUser,
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Error in signup route:", err);
        return NextResponse.json({
            error: "Something went wrong",
            status: 500,
        });
    }
}
