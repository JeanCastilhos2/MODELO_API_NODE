import { itsWorks } from "./controllers/index"
import { Roles } from "./service/Roles"
import { getAllUser, createUser, updateUser, deleteUser ,getUserById } from "./controllers/user/index"
import { generateAccessToken } from "./controllers/auth/index"

const { ADMIN, USER } = Roles


export const defineRoutes = (app) => {

    app.get("/", itsWorks)
    app.post("/login", generateAccessToken)

    app.get("/user", getAllUser)
    app.get("/user/:id", getUserById)
    app.post("/user", createUser)
    app.patch("/user/:id", updateUser)
    app.delete("/user/:id", deleteUser)

}