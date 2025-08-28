import React, { createContext, useContext, useState, ReactNode } from "react";
import {TallyType} from "../types/tally";

type TallyContextType = {
    tallies: TallyType[];
    setTallies: (allies: TallyType[]) => void;
    setTalliesContext: (tallies: TallyType[]) => void;
}

const TallyContext = createContext<TallyContextType | undefined>(undefined);

// Provider
export const TallyProvider = ({ children }: { children: ReactNode }) => {
    const [tallies, setTallies] = useState<TallyType[]>([]);
    // const [selectedTally, setSelectedTally] = useState<TallyType | null>(null);

    const setTalliesContext = (tallyArray: TallyType[]) => {
        setTallies(tallyArray);
    }


    return (
        <TallyContext.Provider value={
                {
                    tallies,
                    setTallies,
                    setTalliesContext,
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