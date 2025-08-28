import React, { createContext, useContext, useState, ReactNode } from "react";
import {TallyType} from "../types/tally";
import {getTallies} from "../utils/api";

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
}

const TallyContext = createContext<TallyContextType | undefined>(undefined);

// Provider
export const TallyProvider = ({ children }: { children: ReactNode }) => {
    const [tallies, setTallies] = useState<TallyType[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    // const [selectedTally, setSelectedTally] = useState<TallyType | null>(null);

    const fetchTallies = async () => {
        try {
            const response = await getTallies();
            setTallies(response);
            return tallies;
        } catch (err) {
            console.log(err);
        }
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