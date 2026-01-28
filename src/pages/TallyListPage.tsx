import React, {useEffect, useState} from "react";
import "../styles/tallyListPage.scss";
import "../styles/global.scss"
import {Tally} from "../components/Tally";
import {useTallyContext} from "../context/TallyContext";
import {ShowComment} from "../components/ShowComment";
import {FormFilter} from "../components/FormFilter";
import {FormAddCurrentlyMileage} from "../components/FormAddCurrentlyMileage";
import {sortTallies} from "../utils/utils";

export const TallyListPage = () => {
    const {tallies, fetchTallies, search, localToken} = useTallyContext();
    const [count, setCount] = useState<number>(3);

    const handleSort = () => {
        if(count === 3) {
            setCount(count - 2);
            return;
        }
        setCount(count + 1);
    }

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
                                <th onDoubleClick={handleSort}>Co wymieniono</th>
                                <th>Data wymiany</th>
                                <th>Marka części</th>
                                <th>Cena</th>
                                <th>Gdzie servisowano</th>
                                <th>Imię mechanika</th>
                                <th>Gwarancja</th>
                                <th>Koniec gwarancji</th>
                                <th>Przebieg przed naprawą</th>
                                <th>Gwarancja wg przebiegu</th>
                                <th>Dokument</th>
                                <th className="comment--field">Uwagi</th>
                                <th>Opcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*{tallies.map((v) => {*/}
                            {/*    return (<Tally*/}
                            {/*        key={v.id}*/}
                            {/*        tally={v}*/}
                            {/*    />)*/}
                            {/*})}*/}

                            {
                                sortTallies(tallies, count, setCount).map(v => {
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