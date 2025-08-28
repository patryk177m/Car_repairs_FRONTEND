import React from "react";
import {TallyType} from "../types/tally";

export const handleChange = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >, fn: React.Dispatch<React.SetStateAction<TallyType | undefined>>) => {
    const { name, value } = e.target as HTMLInputElement;

    fn((prevData: TallyType | undefined) => ({
        ...prevData,
        [name]: value,
    }) as TallyType) ;
};