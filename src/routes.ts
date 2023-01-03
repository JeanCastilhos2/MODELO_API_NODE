import { itsWorks } from "./controllers/index"
import { Roles } from "./service/Roles"
import { getUser, createUser, updateUser, deleteUser } from "./controllers/user/index"
import { generateAccessToken } from "./controllers/auth/index"

const { ADMIN, USER } = Roles


export const defineRoutes = (app) => {

    app.get("/", itsWorks)
    app.post("/login", generateAccessToken)

    app.get("/user", getUser)
    //app.get("/user/:id")
    app.post("/user", createUser)
    app.patch("/user/:id", updateUser)
    app.delete("/user/:id", deleteUser)

}