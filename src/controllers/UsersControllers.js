const {hash, compare} = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require('../database/sqlite')

class UsersControllers {
  
  async create(req, res) {

    const {name, email, password} = req.body;

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?) ", [email])

    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso")

    }

    const hashedPassword = await hash(password, 8)
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
       [name, email, hashedPassword]
       );

    return res.status(201).json()
  }
  
  async update(req, res) {
   const {name, email, password, old_password} = req.body 
   const user_id = req.user.id
   
   const database = await sqliteConnection()
   const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

   if(!user) {
    throw new AppError("Usuário Não encontrado")
   }
   
   const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
   
   if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id ) {
    throw new AppError("Este email já está em uso")

   }


   user.name = name ?? user.name //nulish operator
   user.email = email ?? user.email


   if(password && !old_password) {
    throw new AppError("Você precisa informar senha nova e antiga")
   }


   if(password && old_password) {
    const checkOldPassword = await compare (old_password, user.password)

    if(!checkOldPassword) {
      throw new AppError("Senha antiga não confere")

    } 

    user.password = await hash(password, 8)
   }



   await database.run(`
    UPDATE users SET 
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, user_id])

    return res.json()
  }

}

module.exports = UsersControllers