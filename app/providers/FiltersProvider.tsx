'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export type FiltersState = {
    type: string[];
    experience: string[];
    sphere: string[];
    search: string;
};

type FiltersContextType = {
    filters: FiltersState;
    setFilters: (filters: FiltersState) => void;
    updateFilter: (key: keyof FiltersState, value: string[] | string) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FiltersState>({
        type: [],
        experience: [],
        sphere: [],
        search: '',
    });

    const updateFilter = (key: keyof FiltersState, value: string[] | string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <FiltersContext.Provider value={{ filters, setFilters, updateFilter }}>
            {children}
        </FiltersContext.Provider>
    );
};

// ✅ Custom hook to consume context
export const useFilters = () => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useFilters must be used within a FiltersProvider');
    }
    return context;
};