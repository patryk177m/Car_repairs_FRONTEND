import React, { useState } from "react";
import  "../styles/formAddTally.scss";
import "../styles/global.scss";
import {createTally} from "../utils/api";
import {TallyType} from "../types/tally";
// import { TallyType }  from "../types/tally";

export const FormAddTally: React.FC = () => {
    const [tally, setTally] = useState<TallyType | undefined>();


    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
       e.preventDefault();
        if (!tally) return;
        await createTally(tally);

        return null
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target as HTMLInputElement;

        setTally((prevData: TallyType | undefined) => ({
            ...prevData,
            [name]: value,
        }) as TallyType) ;
    };

    return (
        <form className="form--container form global--container" onSubmit={onSubmit}>
            <label className="form__label" htmlFor="replaced"> Co wymieniono </label>
            <input className="form__input" onChange={handleChange} value={tally?.replaced} type="text" id="replaced" name="replaced" required/>

            <label className="form__label" htmlFor="date_replaced"> Data wymiany </label>
            <input className="form__input" onChange={handleChange} value={String(tally?.date_replaced)} type="date" id="date_replaced" name="date_replaced" required/>

            <label className="form__label" htmlFor="part_brand"> Marka części </label>
            <input className="form__input" onChange={handleChange} value={tally?.part_brand} type="text" id="part_brand" name="part_brand" required/>

            <label className="form__label" htmlFor="cost"> Cena </label>
            <input className="form__input" onChange={handleChange} value={tally?.cost} type="text" id="cost" name="cost" required/>

            <label className="form__label" htmlFor="service"> Gdzie naprawiano </label>
            <input className="form__input" onChange={handleChange} value={tally?.service} type="text" id="service" name="service" required/>

            <label className="form__label" htmlFor="mechanic"> Imię mechanika </label>
            <input className="form__input" onChange={handleChange} value={tally?.mechanic} type="text" id="mechanic" name="mechanic" required/>

            <label className="form__label" htmlFor="guarantee"> Czy gwarancja </label>
            <input className="form__input" onChange={handleChange} value={String(tally?.guarantee) === "undefined" ? "" : String(tally?.guarantee)} type="text" id="guarantee" name="guarantee" required/>

            <label className="form__label" htmlFor="guarantee_time"> Czas do końca gwarancji </label>
            <input className="form__input" onChange={handleChange} value={String(tally?.guarantee_time)} type="date" id="guarantee_time" name="guarantee_time" required/>

            <label className="form__label" htmlFor="current_mileage"> Aktualny przebieg </label>
            <input className="form__input" onChange={handleChange} value={tally?.current_mileage} type="text" id="current_mileage" name="current_mileage" required/>

            <label className="form__label" htmlFor="mileage_before_service"> Przebieg przed naprawą </label>
            <input className="form__input" onChange={handleChange} value={tally?.mileage_before_service} type="text" id="mileage_before_service" name="mileage_before_service" required/>

            <label className="form__label" htmlFor="warranty_by_mileage"> Gwarancja wg przebiegu </label>
            <input className="form__input" onChange={handleChange} value={tally?.warranty_by_mileage} type="text" id="warranty_by_mileage" name="warranty_by_mileage" required/>

            <label className="form__label" htmlFor="document_title"> Nazwa dokumentu </label>
            <input className="form__input" onChange={handleChange} value={tally?.document_title} type="text" id="document_title" name="document_title" required/>

            <label className="form__label" htmlFor="documentURL"> Adres URL dokumentu </label>
            <input className="form__input" onChange={handleChange} value={tally?.documentURL} type="text" id="documentURL" name="documentURL" required/>

            <label className="form__label" htmlFor="comments"> Uwagi </label>
            <textarea className="form__textarea" onChange={handleChange} value={tally?.comments} id="comments" name="comments" required/>

            <button className="form__button" type="submit">Zapisz</button>
        </form>
    )
}