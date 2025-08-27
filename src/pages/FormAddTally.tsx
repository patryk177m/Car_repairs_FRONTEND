import React, { useState } from "react";
import  "../styles/formAddTally.scss";
import "../styles/global.scss";
import {createTally} from "../utils/api";
import {TallyType} from "../types/tally";
import axios from "axios";

export const FormAddTally: React.FC = () => {
    const [tally, setTally] = useState<TallyType | undefined>();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
       e.preventDefault();
        if (!tally) return;
        await uploadFile().then(data => createTally({...tally, documentURL: data }));
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

    //send file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const uploadFile = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(`Success: ${res.data.filename}`);
            return res.data.fileName;
        } catch (err) {
            setMessage("Error uploading file data.");
        }
    };

    return (
        <form className="form--container form global--container" onSubmit={onSubmit}>
            <label className="form__label" htmlFor="replaced"> Co wymieniono </label>
            <input className="form__input" onChange={handleChange} value={tally?.replaced} type="text" id="replaced" name="replaced" required/>

            <label className="form__label" htmlFor="date_replaced"> Data wymiany </label>
            <input className="form__input" onChange={handleChange} value={String(tally?.date_replaced)} type="date" id="date_replaced" name="date_replaced" required/>

            <label className="form__label" htmlFor="part_brand"> Marka części </label>
            <input className="form__input" onChange={handleChange} value={tally?.part_brand} type="text" id="part_brand" name="part_brand" />

            <label className="form__label" htmlFor="cost"> Cena </label>
            <input className="form__input" onChange={handleChange} value={tally?.cost} type="text" id="cost" name="cost" required/>

            <label className="form__label" htmlFor="service"> Gdzie naprawiano </label>
            <input className="form__input" onChange={handleChange} value={tally?.service} type="text" id="service" name="service" required/>

            <label className="form__label" htmlFor="mechanic"> Imię mechanika </label>
            <input className="form__input" onChange={handleChange} value={tally?.mechanic} type="text" id="mechanic" name="mechanic" />

            <label className="form__label" htmlFor="guarantee"> Czy gwarancja </label>
            <input className="form__input" onChange={handleChange} value={String(tally?.guarantee) === "undefined" ? "" : String(tally?.guarantee)} type="text" id="guarantee" name="guarantee" />

            <label className="form__label" htmlFor="guarantee_time"> Czas do końca gwarancji </label>
            <input className="form__input" onChange={handleChange} value={String(tally?.guarantee_time)} type="date" id="guarantee_time" name="guarantee_time" />

            <label className="form__label" htmlFor="current_mileage"> Aktualny przebieg </label>
            <input className="form__input" onChange={handleChange} value={tally?.current_mileage} type="text" id="current_mileage" name="current_mileage" />

            <label className="form__label" htmlFor="mileage_before_service"> Przebieg przed naprawą </label>
            <input className="form__input" onChange={handleChange} value={tally?.mileage_before_service} type="text" id="mileage_before_service" name="mileage_before_service" required/>

            <label className="form__label" htmlFor="warranty_by_mileage"> Gwarancja wg przebiegu </label>
            <input className="form__input" onChange={handleChange} value={tally?.warranty_by_mileage} type="text" id="warranty_by_mileage" name="warranty_by_mileage" />

            <label className="form__label label--added--file" htmlFor="document_title">Dodaj plik</label>
            <label className="form__label label--added" htmlFor="document_title">
                <img className="icon__upload" src="/img/wgrywanie.png" alt="wgrywanie"/>
                <input className="form__input input--added"  onChange={handleFileChange} type="file" id="document_title" name="document_title" />
                <p>{message}</p>
            </label>
            <label className="form__label" htmlFor="documentURL"> Adres URL dokumentu </label>
            <input className="form__input" onChange={handleChange} value={fileName} type="text" id="documentURL" name="documentURL" />

            <label className="form__label" htmlFor="comments"> Uwagi </label>
            <textarea className="form__textarea" onChange={handleChange} value={tally?.comments} id="comments" name="comments" />

            <button className="form__button" type="submit">Zapisz</button>
        </form>
    )
}