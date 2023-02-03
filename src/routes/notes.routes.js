const {Router} = require("express");

const NotesControllers = require("../controllers/NotesControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const NotesRoutes = Router();



const  NotesController = new NotesControllers()

NotesRoutes.use(ensureAuthenticated)

NotesRoutes.get("/", NotesController.index)
NotesRoutes.post("/", NotesController.create)
NotesRoutes.get("/:id", NotesController.show)
NotesRoutes.delete("/:id", NotesController.delete)

module.exports = NotesRoutes // Linha utilizada para exportar pro servidor (server.js)

