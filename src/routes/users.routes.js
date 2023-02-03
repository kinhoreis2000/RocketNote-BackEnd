const {Router} = require("express");
const usersRoutes = Router();
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const UsersControllers = require("../controllers/UsersControllers")
const UserAvatarController = require("../controllers/UserAvatarController")


const upload = multer(uploadConfig.MULTER)

const  usersController = new UsersControllers()
const  userAvatarController = new UserAvatarController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated ,usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated ,upload.single('avatar'), userAvatarController.update )

module.exports = usersRoutes // Linha utilizada para exportar pro servidor (server.js)

