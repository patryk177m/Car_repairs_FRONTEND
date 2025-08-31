import React, {FormEvent, useState} from "react";
import "../styles/formAddTally.scss";
import "../styles/global.scss";

import {useTallyContext} from "../context/TallyContext";
import {handleFileChange} from "../utils/utils";
import {useNavigate} from "react-router";
import {createTally} from "../utils/api";
import {TallyType} from "../types/tally";


export const FormAddTally = () => {
    const navigate = useNavigate();
    const {setFile, fileName, setFileName, message, handleChange, handleAddOnSubmit} = useTallyContext();
    const now = new Date();
    const [addTally, setAddTally] = useState<Omit<TallyType, "id">>({
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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        handleAddOnSubmit(e, addTally, createTally, navigate, addTally, setAddTally)
    }

    return (
        <form className="form--container form global--container" onSubmit={onSubmit}>
            <label className="form__label" htmlFor="replaced"> Co wymieniono </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)} value={addTally?.replaced}
                   type="text"
                   id="replaced" name="replaced" required/>

            <label className="form__label" htmlFor="date_replaced"> Data wymiany </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)}
                   value={String(addTally?.date_replaced)} type="date" id="date_replaced" name="date_replaced"
                   required/>

            <label className="form__label" htmlFor="part_brand"> Marka części </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)} value={addTally?.part_brand}
                   type="text" id="part_brand" name="part_brand"/>

            <label className="form__label" htmlFor="cost"> Cena </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)} value={addTally?.cost}
                   type="text"
                   id="cost" name="cost" required/>

            <label className="form__label" htmlFor="service"> Gdzie naprawiano </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)} value={addTally?.service}
                   type="text"
                   id="service" name="service" required/>

            <label className="form__label" htmlFor="mechanic"> Imię mechanika </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)} value={addTally?.mechanic}
                   type="text"
                   id="mechanic" name="mechanic"/>

            <label className="form__label" htmlFor="guarantee"> Czy gwarancja </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)}
                   value={String(addTally?.guarantee) === "undefined" ? "" : String(addTally?.guarantee)} type="text"
                   id="guarantee" name="guarantee"/>

            <label className="form__label" htmlFor="guarantee_time"> Czas do końca gwarancji </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)}
                   value={String(addTally?.guarantee_time)} type="date" id="guarantee_time" name="guarantee_time"/>

            <label className="form__label" htmlFor="current_mileage"> Aktualny przebieg </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)}
                   value={addTally?.current_mileage}
                   type="text" id="current_mileage" name="current_mileage"/>

            <label className="form__label" htmlFor="mileage_before_service"> Przebieg przed naprawą </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)}
                   value={addTally?.mileage_before_service} type="text" id="mileage_before_service"
                   name="mileage_before_service" required/>

            <label className="form__label" htmlFor="warranty_by_mileage"> Gwarancja wg przebiegu </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)}
                   value={addTally?.warranty_by_mileage}
                   type="text" id="warranty_by_mileage" name="warranty_by_mileage"/>

            <label className="form__label label--added--file" htmlFor="document_title">Dodaj plik</label>
            <label className="form__label label--added" htmlFor="document_title">
                <img className="icon__upload" src="/img/wgrywanie.png" alt="wgrywanie"/>
                <input className="form__input input--added" onChange={(e) => handleFileChange(e, setFile, setFileName)}
                       type="file" id="document_title" name="document_title"/>
                <p>{message}</p>
            </label>
            <label className="form__label" htmlFor="documentURL"> Adres URL dokumentu </label>
            <input className="form__input" onChange={e => handleChange(e, setAddTally)} value={fileName} type="text"
                   id="documentURL" name="documentURL"/>

            <label className="form__label" htmlFor="comments"> Uwagi </label>
            <textarea className="form__textarea" onChange={e => handleChange(e, setAddTally)} value={addTally?.comments}
                      id="comments" name="comments"/>

            <button className="form__button" type="submit">Zapisz</button>
        </form>
    )
}