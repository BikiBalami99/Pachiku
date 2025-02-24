"use client";

import { PachikuWithDetails } from "@/types/pachiku";
import { getAllPachikus } from "@/utils/getPachiku";
import { createContext, useContext, useEffect, useState } from "react";

// Purpose: To provide the pachiku context to the feed and dynamically update its values.

// Context creation
type PachikuContextType = {
    allPachikus: PachikuWithDetails[];
    refreshPachikuData: () => void;
};
const PachikuContext = createContext<PachikuContextType>({
    allPachikus: [],
    refreshPachikuData: () => {},
});

// Context provider
export function PachikuProvider({ children }: { children: React.ReactNode }) {
    const [allPachikus, setAllPachikus] = useState<PachikuWithDetails[]>([]);

    const loadData = async () => {
        try {
            const data = await getAllPachikus();
            if (data === null || !data) {
                throw new Error("Failed loading Pachiku data.");
            }

            setAllPachikus(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const refreshPachikuData = () => {
        loadData();
    };

    return (
        <PachikuContext.Provider value={{ allPachikus, refreshPachikuData }}>
            {children}
        </PachikuContext.Provider>
    );
}

export function usePachikuContext() {
    const context = useContext(PachikuContext);
    if (context === undefined) {
        throw new Error(
            "usePachikuContext must be used within a PachikuProvider"
        );
    }

    return context;
}
