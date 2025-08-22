import React, { useState } from "react";
import  "../styles/formAddTally.scss";
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
            <label htmlFor="replaced"> Co wymieniono </label>
            <input onChange={handleChange} value={tally?.replaced} type="text" name="replaced" required/>

            <label htmlFor="date_replaced"> Data wymiany </label>
            <input onChange={handleChange} value={String(tally?.date_replaced)} type="date" name="date_replaced" />

            <label htmlFor="part_brand"> Marka części </label>
            <input onChange={handleChange} value={tally?.part_brand} type="text" name="part_brand" required/>

            <label htmlFor="cost"> Cena </label>
            <input onChange={handleChange} value={tally?.cost} type="text" name="cost" required/>

            <label htmlFor="service"> Gdzie naprawiano </label>
            <input onChange={handleChange} value={tally?.service} type="text" name="service" required/>

            <label htmlFor="mechanic"> Imię mechanika </label>
            <input onChange={handleChange} value={tally?.mechanic} type="text" name="mechanic" required/>

            <label htmlFor="guarantee"> Czy gwarancja </label>
            <input onChange={handleChange} value={String(tally?.guarantee)} type="text" name="guarantee" />

            <label htmlFor="guarantee_time"> Czas do końca gwarancji </label>
            <input onChange={handleChange} value={String(tally?.guarantee_time)} type="date" name="guarantee_time" />

            <label htmlFor="comments"> Uwagi </label>
            <input onChange={handleChange} value={tally?.comments} type="textarea" name="comments" required/>

            <label htmlFor="current_mileage"> Aktualny przebieg </label>
            <input onChange={handleChange} value={tally?.current_mileage} type="text" name="current_mileage" required/>

            <label htmlFor="mileage_before_service"> Przebieg przed naprawą </label>
            <input onChange={handleChange} value={tally?.mileage_before_service} type="text" name="mileage_before_service" required/>

            <label htmlFor="warranty_by_mileage"> Gwarancja wg przebiegu </label>
            <input onChange={handleChange} value={tally?.warranty_by_mileage} type="text" name="warranty_by_mileage" required/>

            <label htmlFor="document_title"> Nazwa dokumentu </label>
            <input onChange={handleChange} value={tally?.document_title} type="text" name="document_title" required/>

            <label htmlFor="documentURL"> Adres URL dokumentu </label>
            <input onChange={handleChange} value={tally?.documentURL} type="text" name="documentURL" required/>

            <button type="submit">Zapisz</button>
        </form>
    )
}