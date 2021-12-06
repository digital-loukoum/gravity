import { useApi } from "../source/api"
import type { services } from "./services"

export const api = useApi<typeof services>()
