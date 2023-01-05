import { itsWorks } from "./controllers/index"
import { Roles } from "./service/Roles"
import { getAllUser, createUser, updateUser, deleteUser, getUserById } from "./controllers/user/index"
import { verifyAccessToken, generateAccessToken } from "./controllers/auth/index"

const { ADMIN, USER } = Roles

export const defineRoutes = (app) => {

    //ROUTES

    app.get("/", itsWorks)

    //LOGIN

    app.post("/login", generateAccessToken)

    //USER

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

    //LIST

    app.get(
        "/list:user_id",
        verifyAccessToken([ADMIN, USER]),
        getAllUser
    )
    app.post(
        "/list",
        verifyAccessToken([USER]),
        getAllUser
    )

}