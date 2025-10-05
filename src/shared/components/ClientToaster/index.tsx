"use client";
import { useToastStore } from "@/shared/stores/toastStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ClientToaster = () => {
	const { message, clearMessage } = useToastStore();

	useEffect(() => {
		if (message) {
			toast.dismiss();
			toast.success(message);
			clearMessage();
		}
	}, [message, clearMessage]);

	return null;
};

export default ClientToaster;
