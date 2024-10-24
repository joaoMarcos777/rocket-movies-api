const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);

module.exports = routes;
