import { create } from "zustand";

export type SearchQuery = {
    state: string | undefined;  // Updated field
    city: string | undefined;   // Updated field
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: Number;
    bathrooms: Number;
    bedrooms: Number;
    category: string;
}

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({ query: query }),
    query: {
        state: '',   // Updated default value
        city: '',    // Updated default value
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        bedrooms: 0,
        bathrooms: 0,
        category: ''
    }
}));

export default useSearchModal;
