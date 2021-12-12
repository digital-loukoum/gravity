import { createServer } from "http"
import { createApp } from "h3"
import { gravity } from "@digitak/gravity/middleware"
import { services } from "./services"

const app = createApp()
app.use(gravity({ services }))

createServer(app).listen(process.env.PORT || 3000)
