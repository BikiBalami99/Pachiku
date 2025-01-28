import Image from "next/image";
import styles from "./page.module.css";
import NewTweetForm from "./components/NewTweetForm/NewTweetForm";

export default function Home() {
    return (
        <div>
            <NewTweetForm />
            <h1>Today's Tweets</h1>
        </div>
    );
}
