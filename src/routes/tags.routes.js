const {Router} = require("express");

const TagsControllers = require("../controllers/TagsControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const TagsRoutes = Router();



const  TagsController = new TagsControllers()

TagsRoutes.get("/",ensureAuthenticated, TagsController.index)


module.exports = TagsRoutes // Linha utilizada para exportar pro servidor (server.js)

