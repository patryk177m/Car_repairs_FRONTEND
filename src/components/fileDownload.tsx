import axios from "axios";
import React from "react";
import {TallyType} from "../types/tally";

type Props = {
    tally: TallyType,
}

export const FileDownload:React.FC<Props> = ({tally}: Props)=> {
    const handleDownload = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}uploads/${tally.documentURL}`, // <-- tutaj Twój plik
                { responseType: "blob" } // ważne!
            );

            // Tworzymy adres URL dla pobranego pliku
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Tworzymy ukryty link i klikamy go programowo
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", tally.documentURL); // <-- nazwa pliku lokalnie
            document.body.appendChild(link);
            link.click();

            // Sprzątanie
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Błąd pobierania:", err);
        }
    };

    return (
        // <div>
        //     <button onClick={handleDownload}>Pobierz plik</button>
        // </div>
        <label htmlFor="custom-file-upload" className="custom-file-upload">
            {/*<input type="file" id="custom-file-upload" style={{ display: 'none' }}/>*/}
            <img onClick={handleDownload} className="icon__upload" src="/img/wgrywanie.png" alt="wgrywanie"/>
        </label>
    );
}
