const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users");
apiRouter.user("/users", usersRouter);

module.exports = apiRouter;