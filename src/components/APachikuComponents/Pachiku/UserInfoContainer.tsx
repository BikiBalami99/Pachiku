import UserImage from "../UserImage/UserImage";
import ThreeDotsMenu from "@/components/APachikuComponents/Pachiku/ThreeDotsMenu/ThreeDotsMenu";
import { type User } from "@prisma/client";
import styles from "./Pachiku.module.css";

type UserInfoContainerProps = {
    author: User;
    imageLink: string;
    timeSince: string;
    currentUser: User | null;
    setEditFormVisible: (visible: boolean) => void;
};

export default function UserInfoContainer({
    author,
    imageLink,
    timeSince,
    currentUser,
    setEditFormVisible,
}: UserInfoContainerProps) {
    return (
        <div className={styles.userInfoContainer}>
            <UserImage src={imageLink} userFirstName={author.firstName} />
            <div className={styles.textInfo}>
                <h3 className={styles.fullName}>
                    {author.firstName} {author.lastName}
                </h3>
                <h4 className={styles.username}>@{author.username}</h4>
                <p className={styles.timeSince}>{timeSince}</p>
            </div>

            <div className={styles.threeDotsMenuContainer}>
                {currentUser?.id === author.id && (
                    <ThreeDotsMenu
                        actionForEdit={() => setEditFormVisible(true)}
                    />
                )}
            </div>
        </div>
    );
}
