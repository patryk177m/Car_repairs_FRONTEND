import "../styles/variables.scss";
import "../styles/modalwindow.scss";
import {deleteTally} from "../utils/api";
import {useTallyContext} from "../context/TallyContext";
import {removeClass} from "../utils/utils";
// type Props = {
//     tally: TallyType;
// }

export const ModalWindow = () => {
    const {tallies, setTallies, selectedId, selectedReplaced, setIsOpen} = useTallyContext();
    const closeModal = () => {
        removeClass('modal-window', 'show');
        setIsOpen(false);
    }

    const deleteTallyById = (id: string) => {
        if (!id) return;
        const tallyList = tallies.filter(tally => tally.id !== id);
        setTallies(tallyList);
    }

    const removeItem = async (id: string) => {
        if (!id) return;
        await deleteTally(id).then(() => deleteTallyById(id)).finally(() => closeModal());

    }

    return (
        <section className="modal-window">
            <div className="modal">
                <button className="close-x" onClick={closeModal}>
                    X
                </button>
                <span className="icon">
                    &#9888;
                </span>
                <h2>Usuwanie przepisu !</h2>
                <h1 className="modal-recipeTitle">
                    <span>
                        &#10077;
                    </span>
                    { selectedReplaced }
                    <span>
                        &#10078;
                    </span>
                </h1>
                <p>Czy napewno chcesz usunąć przepis z listy ?</p>
                <div className="modal-footer">
                    <button className="modal-btn" onClick={() => removeItem(selectedId!)}>Usuń</button>
                    <button className="modal-btn" onClick={closeModal}>Anuluj</button>
                </div>
            </div>
        </section>
    )
}