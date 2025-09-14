import React from "react";
import {TallyType} from "../types/tally";
import cn from "classnames";
import {addClass, shortContent} from "../utils/utils";
import {useTallyContext} from "../context/TallyContext";

type Props = {
    tally: TallyType;
}

export const TallyComment: React.FC<Props> = ({tally}: Props) => {
    const {setComment} = useTallyContext();

    const openModal = () => {
        setComment(tally.comments);
        addClass('modal--window', 'show');
    }


    return (
        <>
            {tally.comments.length > 50 ?
                (
                    <td onClick={openModal} className={cn("comment--field", {
                        "comment--bold": tally?.comments.length > 50
                    })}>
                        {/*<Link className="tally__link" to="">*/}
                        {shortContent(tally?.comments, 50)}
                        {/*</Link>*/}
                    </td>) : (
                    <td className="comment--field">{tally.comments}</td>
                )
            }
        </>
    )
}