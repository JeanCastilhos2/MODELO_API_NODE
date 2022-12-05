import { itsWorks } from "./controllers/index"
import { Roles } from "./service/Roles"
import { getUser, createUser, updateUser, deleteUser } from "./controllers/user/index"

const { ADMIN, USER } = Roles


export const defineRoutes = (app) => {

    app.get("/", itsWorks)

    app.get("/user", getUser)
    app.post("/user", createUser)
    app.patch("/user/:id", updateUser)
    app.delete("/user/:id", deleteUser)

}