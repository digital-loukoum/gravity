import { createServer } from "http"
import { createApp } from "h3"
import { gravity } from "@digitak/gravity/middleware"
import { services } from "../../../examples/services"

const PORT = 3000

const app = createApp()
app.use(gravity({ services }))

createServer(app).listen(PORT)

console.log("Listening to port", PORT)
