import {ChangeEvent, Dispatch, SetStateAction} from "react";

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