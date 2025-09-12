import { create } from "zustand";
import { Gift } from "../../.next/types/supabase/Gifts";

interface GiftsState {
	gifts: Gift[];
	setGifts: (gifts: Gift[]) => void;
	// addGift: (gift: Gift) => void;
	// updateGift: (gift: Gift) => void;
	// deleteGift: (id: string) => void;
}

export const useGiftStore = create<GiftsState>((set) => ({
	gifts: [],
	setGifts: (gifts) => set({ gifts }),
}));
