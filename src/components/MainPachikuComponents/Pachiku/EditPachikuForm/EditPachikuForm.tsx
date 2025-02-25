import styles from "./EditPachikuForm.module.css";

type EditPachikuFormProps = {
    updatePachiku: (formData: FormData) => void;
    editFormVisible: boolean;
    editedPachiku: string;
    setEditedPachiku: (text: string) => void;
    pachikuId: string;
    setEditFormVisible: (visible: boolean) => void;
};

export default function EditPachikuForm({
    updatePachiku,
    editFormVisible,
    editedPachiku,
    setEditedPachiku,
    pachikuId,
    setEditFormVisible,
}: EditPachikuFormProps) {
    return (
        <form
            action={updatePachiku}
            className={styles.editPachikuForm}
            data-visible={editFormVisible ? "true" : "false"}
        >
            <input
                className={styles.editPachikuInput}
                type="text"
                name="editedPachikuText"
                value={editedPachiku}
                onChange={(e) => setEditedPachiku(e.target.value)}
                required
            />
            <input type="hidden" name="pachikuId" value={pachikuId} />
            <div className={styles.editPachikuButtons}>
                <button
                    onClick={() => setEditFormVisible(false)}
                    className="button whiteButton"
                >
                    Cancel
                </button>
                <button type="submit" className="button primaryButton">
                    Update
                </button>
            </div>
        </form>
    );
}
