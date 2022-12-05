import { itsWorks } from "./controllers/index"
import { createUser, getUser, updateUser} from "./controllers/user/index"

export const defineRoutes = (app) => {
    
    app.get("/", itsWorks)

    app.post("/user", createUser)
    app.get("/user", getUser)
    app.patch("/user/:id", updateUser)
    app.delete("/user/:id", updateUser)

}