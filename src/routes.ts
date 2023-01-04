import { itsWorks } from "./controllers/index"
import { Roles } from "./service/Roles"
import { getAllUser, createUser, updateUser, deleteUser, getUserById } from "./controllers/user/index"
import { verifyAccessToken, generateAccessToken } from "./controllers/auth/index"

const { ADMIN, USER } = Roles


export const defineRoutes = (app) => {

    app.get("/", itsWorks)
    app.post("/login", generateAccessToken)

    app.get(
        "/user",
        verifyAccessToken([ADMIN]),
        getAllUser
    )
    app.get(
        "/user/:id",
        verifyAccessToken([ADMIN]),
        getUserById
    )
    app.post(
        "/user",
        createUser
    )
    app.patch(
        "/user/:id",
        verifyAccessToken([ADMIN, USER]),
        updateUser
    )
    app.delete(
        "/user/:id",
        verifyAccessToken([ADMIN]),
        deleteUser
    )
}