import { itsWorks } from "./controllers/index"
import { createUser, getUser, updateUser} from "./controllers/user/index"

export const defineRoutes = (app) => {
     
    //USER
    
    app.get("/", itsWorks)
    app.post("/user", createUser)
    app.get("/user", getUser)
    app.put("/user/:id", updateUser)

}