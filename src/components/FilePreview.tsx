import React from "react";
import axios from "axios";
import {TallyType} from "../types/tally";

type Props = {
    tally: TallyType;

};

export const FilePreview: React.FC<Props> = ({ tally }) => {

    const handleFileDownload = async () => {

        const fileName = tally.documentURL; // 👈 nazwa pliku do pobrania

        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}public/uploads/${tally.documentURL}`, {
                responseType: "blob", // ⬅️ bardzo ważne – pobiera dane binarne
            });
            console.log(res)
            // Tworzymy URL z Blob i klikamy wirtualny link
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName); // nazwa zapisywanego pliku
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Błąd pobierania pliku", err);
        }
    };



    return (
        <label htmlFor="custom-file-upload" className="custom-file-upload">
            {/*<input type="file" id="custom-file-upload" style={{ display: 'none' }}/>*/}
            <img onClick={handleFileDownload} className="icon__upload" src="/img/wgrywanie.png" alt="wgrywanie"/>
        </label>
    );
};