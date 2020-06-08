const express = require("express");
const usersRouter = express.Router();

const {
    createUser,
    getAllUsers
} = require("../db");

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});

usersRouter.get("/", asyng (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    });
});

usersRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const _user = await getAllUsers(username);

        if(_user) {
            next({
                name: "UserExistsError",
                message: "That username is already in use.  Please try again."
            })
        }

        const user = await createUser({username, password})

        
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;