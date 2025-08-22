import React from "react";
import {Tally} from "../components/Tally";
import "../styles/tallyListPage.scss";

export const TallyListPage = (props: any) => {
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
                <th>Nazwa dokumentu</th>
                <th>Adres URL dokumentu</th>
                <th>Uwagi</th>
            </tr>
            <tbody>
                <tr></tr>
            </tbody>
            </thead>
        </table>

    )
}