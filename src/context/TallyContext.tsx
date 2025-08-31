import React, {
    createContext,
    useContext,
    useState,
    ChangeEvent,
    Dispatch,
    SetStateAction,
    ReactNode,
    FormEvent
} from "react";
import {TallyType} from "../types/tally";
import {createTally, getTallies} from "../utils/api";
import {changeValue, uploadFile} from "../utils/utils";
import {NavigateFunction} from "react-router";

type TallyContextType = {
    tallies: TallyType[];
    setTallies: (allies: TallyType[]) => void;
    fetchTallies: () => Promise<TallyType[] | undefined>;
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
    fileName: string;
    setFileName: Dispatch<SetStateAction<string>>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>
    handleChange: <T extends object>(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fn: Dispatch<SetStateAction<T>>) => void;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    tally: Omit<TallyType, "id">;
    setTally: Dispatch<SetStateAction<Omit<TallyType, "id">>>;
    handleAddOnSubmit: (e: React.FormEvent<HTMLFormElement>, navigate:  NavigateFunction) => void;
}

const TallyContext = createContext<TallyContextType | undefined>(undefined);

// Provider
export const TallyProvider = ({ children }: { children: ReactNode }) => {
    const now = new Date();

    const [tallies, setTallies] = useState<TallyType[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [comment ,setComment] = useState<string>("");
    const [tally, setTally] = useState<Omit<TallyType, "id">>({
        replaced: "",
        date_replaced: now,
        part_brand: "",
        cost: 0,
        service: "",
        mechanic: "",
        guarantee: false,
        guarantee_time: now,
        comments: "",
        current_mileage: 0,
        mileage_before_service: 0,
        warranty_by_mileage: 0,
        document_title: "",
        documentURL: "",
    });

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

    const handleAddOnSubmit = async (e: FormEvent<HTMLFormElement>, navigate:  NavigateFunction) => {
        e.preventDefault();
        if (!tally) return;
        await uploadFile(file, setMessage)
            .then((data: string) => {
                createTally({...tally, documentURL: data});
                navigate("/list")
            })
            .finally(() => {
                    setFileName("");
                    setFile(null);
                    tally.documentURL = "";
                }
            );
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
                    handleChange,
                    comment,
                    setComment,
                    tally,
                    setTally,
                    handleAddOnSubmit,

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