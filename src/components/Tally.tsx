import React from "react";
import {TallyType} from "../types/tally";
import "../styles/tally.scss"
import {Link, useNavigate} from "react-router";
import {calcGuarantee, checkGuarantee, convertToDate, fullDate} from "../utils/date";
import cn from "classnames";
import {deleteTally} from "../utils/api";
import {useTallyContext} from "../context/TallyContext";
import {TallyComment} from "./TallyComment";
import {FileDownload} from "./FileDownload";

type Props = {
    tally: TallyType;
}

export const Tally: React.FC<Props> = ({tally}: Props) => {
    const navigate = useNavigate();
    const {tallies, setTallies} = useTallyContext();

    const dateValid = convertToDate(tally!.guarantee_time);
    const mileageValid = calcGuarantee(tally!.mileage_before_service, tally!.current_mileage, tally!.warranty_by_mileage);

    const deleteTallyById = (id: string) => {
        if (!id) return;
        const tallyList = tallies.filter(tally => tally.id !== id);
        setTallies(tallyList);
    }

    const handleDelete = async (id: string) => {
        if (!id) return;
        await deleteTally(id).then(() => deleteTallyById(id));
    }

    const handleRedirectOnEdit = () => {
        navigate(`/update/${tally.id}`);
    }

    return (
        <>
            <tr className="tally__tr">
                <td>{tally?.replaced}</td>
                <td>{fullDate(tally?.date_replaced as Date)}</td>
                <td>{tally?.part_brand}</td>
                <td>{tally?.cost}</td>
                <td>{tally?.service}</td>
                <td>{tally?.mechanic}</td>
                <td className={cn("colortext--red", {
                    'colortext--green': checkGuarantee(dateValid, mileageValid) === "tak",
                })}>{checkGuarantee(dateValid, mileageValid)}</td>
                <td>{!tally?.guarantee_time ? "-" : fullDate(tally?.guarantee_time as Date)}</td>
                <td>{tally?.current_mileage}</td>
                <td>{tally?.mileage_before_service}</td>
                <td>{tally?.warranty_by_mileage}</td>
                <td>
                    {tally.documentURL ?
                        (<FileDownload
                            tally={tally}
                        />) : <img onClick={handleRedirectOnEdit} className="options__icon" src="/img/upload.svg"
                                   alt="edit icon"/>
                    }
                </td>
                <TallyComment tally={tally} />
                <td className="tally__td--options options">
                    <label className="custom-file-upload options--label option option--edit">
                        <Link to={`/update/${tally?.id}`}>
                            <img className="options__icon" src="/img/edit.svg" alt="edit"/>
                        </Link>
                    </label>
                    <label className="custom-file-upload options--label option option--delete">
                        <img onClick={(e) => handleDelete(tally.id)} className="options__icon" src="/img/delete.svg"
                             alt="delete"/>
                    </label>
                </td>
            </tr>
        </>
    )
}