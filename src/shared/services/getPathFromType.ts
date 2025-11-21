import { getPath } from "./getPath";

export const getPathFromType = (type: string, id: string, senderId: string) => {
	let pathName = "";
	let linkId = "";
	let path = "";
	let pathId = "";

	switch (type) {
		case "event":
			pathName = "Event";
			pathId = id;
			break;
		case "event_secret_friend":
			pathName = "Event";
			linkId = "secret_friend";
			pathId = id;
			break;
		case "request_sent":
			pathName = "Friend profile";
			pathId = id;
			break;
		case "request_accepted":
			pathName = "Friend profile";
			pathId = id;
			break;
		case "event_comment":
			pathName = "Event";
			linkId = "comments";
			pathId = id;
			break;
		case "question":
			pathName = "Gifts";
			linkId = id;
			break;
		case "answer":
			pathName = "Friend Profile";
			linkId = id;
			pathId = senderId;
			break;
	}

	if (pathId) {
		path = getPath(pathName, pathId);
	} else {
		path = getPath(pathName);
	}

	if (linkId) path += `#${linkId}`;

	return path;
};
