import React from "react";
import Image from "next/image";
import styles from "./UserImage.module.css";

export default function UserImage({
    src,
    userFirstName,
}: {
    src: string;
    userFirstName: string;
}) {
    return (
        <Image
            className={styles.image}
            src={src}
            width={64}
            height={64}
            alt={`Image of user ${userFirstName}`}
        ></Image>
    );
}
