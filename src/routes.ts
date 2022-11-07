import { itsWorks } from "./controllers/index"
import { createUser, getUser } from "./controllers/user/index"

export const defineRoutes = (app) => {
     
    //USER
    
    app.get("/", itsWorks)
    app.post("/user", createUser)
    app.get("/user", getUser)

}