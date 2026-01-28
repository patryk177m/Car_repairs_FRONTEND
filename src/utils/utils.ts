import {ChangeEvent, Dispatch, SetStateAction} from "react";
import axios from "axios";
import {TallyType} from "../types/tally";
import {jwtDecode} from "jwt-decode";

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


// short content
export const shortContent = (content: string, index: number) => {
    if (!content) return;
    let shortContent = content;
    if (content.length > index) {
      shortContent = `${content.substring(0, index)}  ...`;
    }

    return shortContent;
}

// add and remove class

export const addClass = (titleClass: string, addTitleClass: string) => {
    return  document.querySelector(`.${titleClass}`)?.classList.add(addTitleClass);
}

export const removeClass = (titleClass: string, removeTitleClass: string) => {
    return  document.querySelector(`.${titleClass}`)?.classList.remove(removeTitleClass);
}

//filter by searchQuery

export const filteredTallies = (tallies: TallyType[], search: string) => {
    return tallies.filter((tally) => tally.replaced.toLowerCase().includes(search.toLowerCase()));
}

// function add and clear params for URL

export const updateParams = () => {
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    for (const [key, value] of params.entries()) {
        if (!value || value === "") {
            params.delete(key);
            changed = true;
        }
    }

    if (!changed) {
        const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
        window.history.replaceState({}, "", newUrl);
    }
}

// do pobrania usera z jwt

type TokenPayload = {
    id: string;
    email: string;
};

export const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return jwtDecode<TokenPayload>(token);
    } catch {
        return null;
    }
};

// sortowanie

export const sortTallies = (tallies: TallyType[], count: number, setCount:Dispatch<SetStateAction<number>>) => {
    console.log('count :', count);
    let list = [...tallies].map(t => t);
    if(count === 1) {
        console.log('1')
        list = [...list].sort((a, b) => a.replaced.localeCompare(b.replaced));
    }
    if (count === 2) {
        console.log('2')
        list = [...list].sort((a, b) => a.replaced.localeCompare(b.replaced)).reverse();
    }
    if (count === 3) {
        console.log('3')
        list = list.map(tally => tally);
    }
    return list;
}