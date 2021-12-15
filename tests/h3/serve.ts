import { createServer } from "http"
import { createApp } from "h3"
import { gravity } from "@digitak/gravity/library/middleware/index.js"
import { services } from "./services"

const PORT = 3000

const app = createApp()
app.use(gravity({ services }))

createServer(app).listen(PORT)

console.log("Listening to port", PORT)
