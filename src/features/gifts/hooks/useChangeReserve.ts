import { useUser } from "@/features/auth/hooks/useUser";
import { createClient } from "@/shared/services/supabase/client";
import { Gift } from "@/shared/types/supabase/supabase";
import { reserveGift } from "../services/supabase";
import { Dispatch, SetStateAction } from "react";

export function useChangeReserve(
    gifts: Gift[],
    setGifts: Dispatch<SetStateAction<Gift[]>>,
) {
    const [user] = useUser();
    const supabase = createClient();

    const changeReserve = async (giftId: string,) => {
        const targetGift = gifts.find(g => g.id === giftId);
        if (!targetGift || !user?.id) return;

        const nextValue = !targetGift.reserved;
        const nextReservedBy = nextValue ? user.id : null;

        setGifts(prev => prev.map(g => 
                    g.id === giftId 
                        ? { ...g, reserved: nextValue, reserved_by: nextReservedBy } 
                        : g
                ));
                
        try {
            await reserveGift(giftId, supabase, nextValue, user?.id);
        } catch (error) {
            console.error(error);
        }
    };

    return { changeReserve };
}