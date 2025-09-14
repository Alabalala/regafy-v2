import { ROUTES } from "./routes";

export function getPath(name: string, id?: string): string {
	if (!name) return "#";

	const route = ROUTES.find((route) => route.name === name)?.path;
	if (!route) return "#";

	return id ? route.replace(":id", String(id)) : route;
}
