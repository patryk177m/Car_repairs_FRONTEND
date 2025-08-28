import React from "react";
import {TallyType} from "../types/tally";
import "../styles/tally.scss"
import {Link} from "react-router";
import {calcGuarantee, checkGuarantee, convertToDate, fullDate} from "../utils/date";
import cn from "classnames";
import {FileDownload} from "./fileDownload";
import {deleteTally} from "../utils/api";

type Props = {
    tally: TallyType;
    deleteTallyById: (id: string) => void;
}

export const Tally: React.FC<Props> = ({ tally, deleteTallyById }: Props) => {
    const dateValid = convertToDate(tally!.guarantee_time);
    const mileageValid = calcGuarantee(tally!.mileage_before_service, tally!.current_mileage, tally!.warranty_by_mileage);



    const handleDelete = async (id: string) => {
        if (!id) return;
        await deleteTally(id).then(() => deleteTallyById(id));
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
            <td className={cn("colortext--red",{
                'colortext--green': checkGuarantee(dateValid, mileageValid) === "tak",
            })}>{checkGuarantee(dateValid, mileageValid)}</td>
            <td>{!tally?.guarantee_time ? "-" : fullDate(tally?.guarantee_time as Date)}</td>
            <td>{tally?.current_mileage}</td>
            <td>{tally?.mileage_before_service}</td>
            <td>{tally?.warranty_by_mileage}</td>
            <td>
                { tally.documentURL &&
                    (<FileDownload
                    tally={tally}
                />)
                }
            </td>
            <td colSpan={2}><Link className="tally__link" to="">{tally?.comments}</Link></td>
            <td className="tally__td--options options">
                <label className="custom-file-upload options--label option option--edit">
                    <img className="options__icon"  src="/img/edit.svg" alt="edit"/>
                </label>
                <label className="custom-file-upload options--label option option--delete">
                    <img onClick={(e) => handleDelete(tally.id)} className="options__icon" src="/img/delete.svg" alt="delete"/>
                </label>
            </td>
        </tr>

        </>
    )
}