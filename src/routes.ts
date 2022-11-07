import { itsWorks } from "./controllers/index"

export const defineRoutes = (app) => {
    app.get("/", itsWorks)
}