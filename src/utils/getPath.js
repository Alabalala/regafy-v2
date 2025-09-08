import { ROUTES } from "./routes";

export function getPath(name, id) {
  if (!name) return null
  if (id) {
    return ROUTES.find((route) => route.name === name)?.path.replace(":id", String(id))
  }
  return ROUTES.find((route) => route.name === name)?.path
}