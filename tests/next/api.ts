import { defineApi } from "@digitak/gravity"
import type { services } from "./services"

export const api = defineApi<typeof services>()
