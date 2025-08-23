import React from "react";
import {TallyType} from "../types/tally";
import "../styles/tally.scss"
import {Link} from "react-router";
import {convertToDate, fullDate} from "../utils/date";

type Props = {
    tally: TallyType | null;
}

export const Tally: React.FC<Props> = ({tally}: Props) => {

    return (
        <tr className="tally__tr">
            <td>{tally?.replaced}</td>
            <td>{fullDate(tally?.date_replaced as Date)}</td>
            <td>{tally?.part_brand}</td>
            <td>{tally?.cost}</td>
            <td>{tally?.service}</td>
            <td>{tally?.mechanic}</td>
            <td>{convertToDate(tally!.guarantee_time)}</td>
            <td>{!tally?.guarantee_time ? "-" : fullDate(tally?.guarantee_time as Date)}</td>
            <td>{tally?.current_mileage}</td>
            <td>{tally?.mileage_before_service}</td>
            <td>{tally?.warranty_by_mileage}</td>
            <td></td>
            <td colSpan={2}><Link className="tally__link" to="">{tally?.comments}</Link></td>
            <td><span>TODO</span></td>
        </tr>
    )
}