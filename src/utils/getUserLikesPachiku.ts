"use server";

import { prisma } from "@/lib/prisma";

export async function getUserLikesPachiku(
    currentUserId: string,
    pachikuId: string
) {
    console.log("We in getUserLikesPachiku");
    console.log(currentUserId, pachikuId);
    return prisma.like.findUnique({
        where: {
            userId_pachikuId: {
                userId: currentUserId,
                pachikuId: pachikuId,
            },
        },
    });
}
