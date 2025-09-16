import { Gift } from "@/shared/types/supabase/supabase";
import { create } from "zustand";

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
