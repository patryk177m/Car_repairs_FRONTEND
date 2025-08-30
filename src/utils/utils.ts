import {ChangeEvent, Dispatch, SetStateAction} from "react";
import axios from "axios";

export const changeValue = <T extends object> (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    fn: Dispatch<SetStateAction<T>>
) => {
    const { name, value } = e.target;

    fn(prev => ({
        ...prev,
        [name]: value,
    }));
};


//send file
export const handleFileChange =  (e: ChangeEvent<HTMLInputElement>, setFile: Dispatch<SetStateAction<File | null>>, setFileName: Dispatch<SetStateAction<string>>) => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    } else {
        setFile(null);
        setFileName("");
    }
};

export const uploadFile = async (file: File | null, setMessage :Dispatch<SetStateAction<string>>) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage(`Success`);
        return res.data.fileName;
    } catch (err) {
        setMessage("Error uploading file data.");
    }
};