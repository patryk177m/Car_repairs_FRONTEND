import React from "react";
import "../styles/showComment.scss"
import {useTallyContext} from "../context/TallyContext";
import {removeClass} from "../utils/utils";

export const ShowComment = () => {
    const {comment} = useTallyContext();

const closeModal = () => {
    removeClass('modal--window', 'show')
}

    return (
        <section className="modal--window">
            <div className="modal">
                <button className="close--x" onClick={closeModal}>X</button>
                <p>{comment}</p>
            </div>
        </section>
    )
}