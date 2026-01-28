import React, {useEffect, useState} from "react";
import "../styles/tallyListPage.scss";
import "../styles/global.scss"
import {Tally} from "../components/Tally";
import {useTallyContext} from "../context/TallyContext";
import {ShowComment} from "../components/ShowComment";
import {FormFilter} from "../components/FormFilter";
import {FormAddCurrentlyMileage} from "../components/FormAddCurrentlyMileage";
import {sortTallies} from "../utils/utils";
import {TallyType} from "../types/tally";

export const TallyListPage = () => {
    const {tallies, fetchTallies, search, localToken} = useTallyContext();
    const [count, setCount] = useState<1 | 2 | 3>(3);
    const [sortByField, setSortByField] = useState<keyof TallyType>("replaced");

    const handleSort = <K extends keyof TallyType>(field: K,) => {

        setCount(prev => {
            if (prev === 3) return 1;
            return (prev + 1) as 2 | 3;
        });

        setSortByField(field);
    };

    useEffect(() => {
        fetchTallies();

    }, [search, localToken]);

    return (
        <>
            {!localToken || (tallies.length <= 0 && !search) ? <h1 className="global--container title">Jeszcze nie posiadasz wpisów do wyświetlenia</h1> :
                (
                    <>
                        <div className="global--container forms--container">

                            <FormFilter/>
                            <FormAddCurrentlyMileage/>
                        </div>
                        <table className="global--container table">
                            <thead>
                            <tr>
                                <th onDoubleClick={() => handleSort("replaced")}>Co wymieniono</th>
                                <th onDoubleClick={() =>handleSort("date_replaced")}>Data wymiany</th>
                                <th onDoubleClick={() =>handleSort("part_brand")}>Marka części</th>
                                <th onDoubleClick={() =>handleSort("cost")}>Cena</th>
                                <th onDoubleClick={() =>handleSort("service")}>Gdzie servisowano</th>
                                <th onDoubleClick={() =>handleSort("mechanic")}>Imię mechanika</th>
                                <th>Gwarancja</th>
                                <th onDoubleClick={() =>handleSort("guarantee_time")}>Koniec gwarancji</th>
                                <th>Przebieg przed naprawą</th>
                                <th>Gwarancja wg przebiegu</th>
                                <th>Dokument</th>
                                <th className="comment--field">Uwagi</th>
                                <th>Opcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                sortTallies(tallies, count, sortByField).map(v => {
                                    return (<Tally
                                        key={v.id}
                                        tally={v}
                                    />)
                                })
                            }
                            </tbody>
                        </table>
                    </>
                )
            }
            <ShowComment/>
        </>
    )
}