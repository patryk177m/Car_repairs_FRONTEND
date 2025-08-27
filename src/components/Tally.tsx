import React from "react";
import {TallyType} from "../types/tally";
import "../styles/tally.scss"
import {Link} from "react-router";
import {calcGuarantee, checkGuarantee, convertToDate, fullDate} from "../utils/date";
import cn from "classnames";
import {FileDownload} from "./fileDownload";

type Props = {
    tally: TallyType;
}

export const Tally: React.FC<Props> = ({tally}: Props) => {
    // const [file, setFile] = useState<File | null>(null);
    // const [fileName, setFileName] = useState<string>(tally.documentURL);

    const dateValid = convertToDate(tally!.guarantee_time);
    const mileageValid = calcGuarantee(tally!.mileage_before_service, tally!.current_mileage, tally!.warranty_by_mileage);

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
                <FileDownload
                    tally={tally}
                />
            </td>
            <td colSpan={2}><Link className="tally__link" to="">{tally?.comments}</Link></td>
            <td><span>TODO</span></td>
        </tr>

        </>
    )
}