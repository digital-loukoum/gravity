import { defineApi } from "@digitak/gravity-next"
import type { services } from "./services"

export const { api, useApi } = defineApi<typeof services>()
