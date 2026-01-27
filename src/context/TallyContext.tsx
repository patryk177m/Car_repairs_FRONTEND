import React, {
    createContext,
    useContext,
    useState,
    ChangeEvent,
    Dispatch,
    SetStateAction,
    ReactNode,
    FormEvent,
} from "react";
import {getFilteredTallies, logout} from "../utils/api";
import {changeValue, uploadFile} from "../utils/utils";
import {NavigateFunction} from "react-router";
import {TallyType} from "../types/tally";

type TallyContextType = {
    tallies: TallyType[];
    setTallies: (allies: TallyType[]) => void;
    fetchTallies: () => void;
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
    fileName: string;
    setFileName: Dispatch<SetStateAction<string>>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>
    handleChange: <T extends object>(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fn: Dispatch<SetStateAction<T>>) => void;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    handleAddOnSubmit: <T extends object>(
        e: FormEvent<HTMLFormElement>,
        addData: T | null,
        fnSubmit: (data: T) => Promise<void>,
        navigate: NavigateFunction,
        resetTemplate: T,
        fn: Dispatch<SetStateAction<T>>
    ) => void;
    handleUpdateOnSubmit: <T extends object>(
        e: FormEvent<HTMLFormElement>,
        id: string,
        updateData: T | null,
        fnSubmit: (id: string, data: T) => Promise<void>,
        navigate: NavigateFunction,
        resetTemplate: T,
        fn: Dispatch<SetStateAction<T>>
    ) => void;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    localToken: string | null;
    setLocalToken: Dispatch<SetStateAction<string | null>>;
    handleLogout: (e: React.MouseEvent<HTMLAnchorElement>, navigate: NavigateFunction) => void;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    valueCurrentMileage: number;
    setValueCurrentMileage: Dispatch<SetStateAction<number>>;
}

const TallyContext = createContext<TallyContextType | undefined>(undefined);

// Provider
export const TallyProvider = ({children}: { children: ReactNode }) => {
    const [tallies, setTallies] = useState<TallyType[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [search, setSearch] = useState("");
    const [localToken, setLocalToken] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [valueCurrentMileage, setValueCurrentMileage] = useState<number>(0)

    const fetchTallies = async () => {
        return await getFilteredTallies(search)
            .then((response) => setTallies(response))
            .catch(() => "Unable to fetch tallies");
    }

    const handleChange = <T extends object>(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fn: Dispatch<SetStateAction<T>>) => {
        if (!fn) return;
        changeValue<T>(e, fn);
    }

    const handleAddOnSubmit = async <T extends object>(
        e: FormEvent<HTMLFormElement>,
        addData: T | null,
        fnSubmit: (data: T) => Promise<void>,
        navigate: NavigateFunction,
        resetTemplate: T,
        fn: Dispatch<SetStateAction<T>>
    ) => {
        e.preventDefault();
        if (!addData) return;

        try {
            const uploadedUrl = await uploadFile(file, setMessage);
            await fnSubmit({...addData, documentURL: uploadedUrl});
            navigate("/list");
        } finally {
            setFileName("");
            setFile(null);
            fn(resetTemplate);
        }
    };

    const handleUpdateOnSubmit = async <T extends object>(
        e: FormEvent<HTMLFormElement>,
        id: string,
        updateData: T | null,
        fnSubmit: (id: string, data: T) => Promise<void>,
        navigate: NavigateFunction,
        resetTemplate: T,
        fn: Dispatch<SetStateAction<T>>
    ) => {
        e.preventDefault();
        if (!updateData || !id) return;

        try {
            const uploadedUrl = await uploadFile(file, setMessage);
            await fnSubmit(id, {...updateData, documentURL: uploadedUrl});
            navigate("/list");
        } finally {
            setFileName("");
            setFile(null);
            fn(resetTemplate);
        }
    };

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>, navigate: NavigateFunction) => {
        e.preventDefault()
        await logout().then(() => {
            localStorage.removeItem('token')
            setLocalToken(localStorage.getItem('token'))
            navigate("/login");
        })
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
                handleAddOnSubmit,
                handleUpdateOnSubmit,
                search,
                setSearch,
                localToken,
                setLocalToken,
                handleLogout,
                error,
                setError,
                valueCurrentMileage,
                setValueCurrentMileage,

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