import React, {useEffect, useState} from "react";
import {useTallyContext} from "../context/TallyContext";
import {getTallyById, updateTally} from "../utils/api";
import {TallyType} from "../types/tally";
import {useNavigate, useParams} from "react-router";
import {handleFileChange, uploadFile} from "../utils/utils";

export const FileUpdate = () => {
    const {handleChange, setFile, setFileName, fileName, file, setMessage, message} = useTallyContext();
    const navigate = useNavigate();
    const now = new Date();

    const [selectedTally, setSelectedTally] = useState<TallyType>({
        id: "",
        replaced: "",
        date_replaced: now,
        part_brand: "",
        cost: 0,
        service: "",
        mechanic: "",
        guarantee: false,
        guarantee_time: now,
        comments: "",
        current_mileage: 0,
        mileage_before_service: 0,
        warranty_by_mileage: 0,
        document_title: "",
        documentURL: "",
    });

    const {id} = useParams<{ id: string }>()

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!id) return;
        await uploadFile(file, setMessage).then((data: string) => {
            updateTally(id, {
                ...selectedTally,
                documentURL: data
            });
             navigate("/list")
        }).finally(() => {
            setFile(null);
            setFileName("");
            selectedTally.documentURL = "";
        });
        ;
    }

    useEffect(() => {
        if (!id) return;
        getTallyById(id).then((data) => {
            if (!data) return;
            setSelectedTally(data);
        })
    }, []);

    return (
        <>
            {!selectedTally ||
                <form className="form--container form global--container" onSubmit={onSubmit}>
                    <label className="form__label" htmlFor="replaced"> Co wymieniono </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.replaced} type="text" id="replaced" name="replaced" required/>

                    <label className="form__label" htmlFor="date_replaced"> Data wymiany </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={String(selectedTally.date_replaced) ? new Date(selectedTally.date_replaced).toISOString().split("T")[0]
                               : ""} type="date" id="date_replaced" name="date_replaced" required/>

                    <label className="form__label" htmlFor="part_brand"> Marka części </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.part_brand} type="text" id="part_brand" name="part_brand"/>

                    <label className="form__label" htmlFor="cost"> Cena </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.cost} type="text" id="cost" name="cost" required/>

                    <label className="form__label" htmlFor="service"> Gdzie naprawiano </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.service} type="text" id="service" name="service" required/>

                    <label className="form__label" htmlFor="mechanic"> Imię mechanika </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.mechanic} type="text" id="mechanic" name="mechanic"/>

                    <label className="form__label" htmlFor="guarantee"> Czy gwarancja </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={String(selectedTally.guarantee) === "undefined" ? "" : String(selectedTally?.guarantee)}
                           type="text" id="guarantee" name="guarantee"/>

                    <label className="form__label" htmlFor="guarantee_time"> Czas do końca gwarancji </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={String(selectedTally.guarantee_time) ? new Date(selectedTally.guarantee_time).toISOString().split("T")[0]
                               : ""} type="date" id="guarantee_time" name="guarantee_time"/>

                    <label className="form__label" htmlFor="current_mileage"> Aktualny przebieg </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.current_mileage} type="text" id="current_mileage"
                           name="current_mileage"/>

                    <label className="form__label" htmlFor="mileage_before_service"> Przebieg przed naprawą </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.mileage_before_service} type="text" id="mileage_before_service"
                           name="mileage_before_service" required/>

                    <label className="form__label" htmlFor="warranty_by_mileage"> Gwarancja wg przebiegu </label>
                    <input className="form__input" onChange={e => handleChange(e, setSelectedTally)}
                           value={selectedTally.warranty_by_mileage} type="text" id="warranty_by_mileage"
                           name="warranty_by_mileage"/>

                    <label className="form__label label--added--file" htmlFor="document_title">Dodaj plik</label>
                    <label className="form__label label--added" htmlFor="document_title">
                        <img className="icon__upload" src="/img/wgrywanie.png" alt="wgrywanie"/>
                        <input className="form__input input--added"
                               onChange={(e) => handleFileChange(e, setFile, setFileName)} type="file"
                               id="document_title" name="document_title"/>
                        <p>{message}</p>
                    </label>
                    <label className="form__label" htmlFor="documentURL"> Adres URL dokumentu </label>
                    <input className="form__input" value={selectedTally.documentURL || fileName}
                           onChange={e => handleChange(e, setSelectedTally)}
                           type="text" id="documentURL" name="documentURL"/>

                    <label className="form__label" htmlFor="comments"> Uwagi </label>
                    <textarea className="form__textarea" onChange={e => handleChange(e, setSelectedTally)}
                              value={selectedTally.comments} id="comments" name="comments"/>

                    <button className="form__button">Zaktualizuj</button>
                </form>
            }
        </>
    )
}