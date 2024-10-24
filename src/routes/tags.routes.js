const { Router } = require("express");
const tagsRouter = Router();

const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;
