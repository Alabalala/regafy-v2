import { create } from "zustand";

interface ToastStore {
	message: string | null;
	setMessage: (message: string) => void;
	clearMessage: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
	message: null,
	setMessage: (message) => set({ message }),
	clearMessage: () => set({ message: null }),
}));
