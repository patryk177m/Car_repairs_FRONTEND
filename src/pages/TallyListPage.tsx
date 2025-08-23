import { useState, useEffect } from "react";
import "../styles/tallyListPage.scss";
import { TallyType } from "../types/tally";
import { getTallies } from "../utils/api";
import { Tally } from "../components/Tally";

export const TallyListPage = () => {
    const [tallies, setTallies] = useState<TallyType[]>([]);

    useEffect(() => {
        const fetchTallies = async () => {
            try {
                const response = await getTallies();
                setTallies(response);
                // return response
            } catch (err) {
                console.log(err);
            }
        };

        fetchTallies();
    }, []);

    return (
        <table className="global--container table">
            <thead>
                <tr>
                    <th>Co wymieniono</th>
                    <th>Data wymiany</th>
                    <th>Marka części</th>
                    <th>Cena</th>
                    <th>Gdzie servisowano</th>
                    <th>Imię mechanika</th>
                    <th>Gwarancja</th>
                    <th>Koniec gwarancji</th>
                    <th>Aktualny przebieg</th>
                    <th>Przebieg przed naprawą</th>
                    <th>Gwarancja wg przebiegu</th>
                    <th>Dokument</th>
                    <th colSpan={2}>Uwagi</th>
                    <th>Opcje</th>
                </tr>
            </thead>
            <tbody>
                {tallies.length <= 0 || tallies.map((v) => {
                    return (<Tally
                        tally={v}
                        key={v.id}
                    />)
                })}
            </tbody>

        </table>

    )
}