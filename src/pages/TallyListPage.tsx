import React, {useEffect} from "react";
import "../styles/tallyListPage.scss";
import {Tally} from "../components/Tally";
import {useTallyContext} from "../context/TallyContext";
import {ShowComment} from "../components/ShowComment";
import {FormFilter} from "../components/FormFilter";

export const TallyListPage = () => {
    const {tallies, fetchTallies, search, localToken} = useTallyContext();

    useEffect(() => {
        fetchTallies();

    }, [search, localToken]);

    return (
        <>
            {tallies.length <= 0 ? <h1 className="global--container title">Jeszcze nie posiadasz wpisów do wyświetlenia</h1> :
                (
                    <>
                        <FormFilter/>
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
                                <th className="comment--field">Uwagi</th>
                                <th>Opcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tallies.map((v) => {
                                return (<Tally
                                    key={v.id}
                                    tally={v}
                                />)
                            })}
                            </tbody>
                        </table>
                    </>
                )
            }
            <ShowComment/>
        </>
    )
}