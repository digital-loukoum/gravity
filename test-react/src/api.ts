import { useApi } from "@digitak/gravity"
import type { services } from "../../test-h3/services"

export const api = useApi<typeof services>()
