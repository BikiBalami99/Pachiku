import styles from "./Pachiku.module.css";

export default function Pachiku({}) {
    return (
        <section className={styles.Pachiku}>
            <div className={styles.body}>
                <div>Image</div>
                <div>
                    <div>
                        <h3>Name</h3>
                        <p>username</p>
                        <p>・</p>
                        <p>10m</p>
                    </div>
                    The Pachiku
                </div>
            </div>

            <div className={styles.likesCommentsShare}>
                <div>likes</div>
                <div>Comments</div>
                <div>Share</div>
            </div>
        </section>
    );
}
