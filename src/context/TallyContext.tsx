import React, {createContext, useContext, useState, ChangeEvent, Dispatch, SetStateAction, ReactNode} from "react";
import {TallyType} from "../types/tally";
import {getTallies} from "../utils/api";
import {changeValue} from "../utils/utils";

type TallyContextType = {
    tallies: TallyType[];
    setTallies: (allies: TallyType[]) => void;
    fetchTallies: () => Promise<TallyType[] | undefined>;
    file: File | null;
    setFile: (file: File) => void;
    fileName: string;
    setFileName: (fileName: string) => void;
    message: string;
    setMessage: (message: string) => void;
    // selectedTally: TallyType;
    // setSelectedTally: (tally: TallyType) => void;
    handleChange: <T extends object>(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fn: Dispatch<SetStateAction<T>>) => void;
}

const TallyContext = createContext<TallyContextType | undefined>(undefined);

// Provider
export const TallyProvider = ({ children }: { children: ReactNode }) => {
    const [tallies, setTallies] = useState<TallyType[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    // const now = new Date();
    //
    // const [selectedTally, setSelectedTally] = useState<TallyType>({
    //     id: "",
    //     replaced: "",
    //     date_replaced: now,
    //     part_brand: "",
    //     cost: 0,
    //     service: "",
    //     mechanic: "",
    //     guarantee: false,
    //     guarantee_time: now,
    //     comments: "",
    //     current_mileage: 0,
    //     mileage_before_service: 0,
    //     warranty_by_mileage: 0,
    //     document_title: "",
    //     documentURL: "",
    // });

    const fetchTallies = async () => {
        try {
            const response = await getTallies();
            setTallies(response);
            return tallies;
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = <T extends object> (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fn: Dispatch<SetStateAction<T>>) => {
        if (!fn) return;
        changeValue<T>(e, fn);
    }


    return (
        <TallyContext.Provider value={
                {
                    tallies,
                    setTallies,
                    fetchTallies,
                    file,
                    setFile,
                    fileName,
                    setFileName,
                    message,
                    setMessage,
                    // selectedTally,
                    // setSelectedTally,
                    handleChange,

            }
        }>
            {children}
        </TallyContext.Provider>
    );
};

export const useTallyContext = () => {
    const context = useContext(TallyContext);
    if (!context) {
        throw new Error("useTally must be used within a TallyProvider");
    }
    return context;
};