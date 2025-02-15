"use server";

import { prisma } from "@/lib/prisma";

export async function getUserLikesPachiku(
    currentUserId: string,
    pachikuId: string
) {
    return prisma.like.findUnique({
        where: {
            userId_pachikuId: {
                userId: currentUserId,
                pachikuId: pachikuId,
            },
        },
    });
}
