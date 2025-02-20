import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { firstName, lastName, username, password } = await req.json();

    if (!firstName || !lastName || !username || !password) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const email = `${randomUUID()}@mail.com`;
    const image = "/icons/no-image-icon.svg";

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                image,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: `User creation failed: ${error} ` },
            { status: 500 }
        );
    }
}
