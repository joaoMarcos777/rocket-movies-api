const { Router } = require("express");
const movieNotesRouter = Router();

const NotesController = require("../controllers/MovieNotesController");

const movieNotesController = new NotesController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

movieNotesRouter.use(ensureAuthenticated);

movieNotesRouter.get("/", movieNotesController.index);
movieNotesRouter.post("/", movieNotesController.create);
movieNotesRouter.get("/:id", movieNotesController.show);
movieNotesRouter.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRouter;
