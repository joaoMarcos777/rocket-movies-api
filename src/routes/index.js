const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionRouter = require("./sessions.routes");
const movieNotesRouter = require("./movie_notes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/movie_notes", movieNotesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;
