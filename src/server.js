require('express-async-errors')
const AppError = require("./utils/AppError")
const express = require('express'); // Estou pegando todas as funcionalidades do módulo express e colocando dentro da constante express
const routes = require('./routes') // Quando não especificamos o arquivo (Veja que aqui só falamos qual pasta que tá) ele inicializar automaticamente o index.js
const app = express(); //Estamos inicializando o express
const PORT = 5000; // Estamos criando o endereço, o número da porta que a API estará esperando as requisições
const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig = require('./configs/upload')
const cors = require('cors') 

app.use(cors());
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER, console.log(uploadConfig.UPLOADS_FOLDER)))
app.use(express.json())
 
app.use(routes)

migrationsRun()

app.use((error, req, res, next) =>
  {
    if(error instanceof AppError) {
      
      return res.status(error.statusCode).json(
        {
          status:"error", 
          message:error.message
        }
      );
    }

      console.error(error)
      
    return res.status(500).json(
      {
      status:"error",
      message:"Internal error server"
      }
    )
  }
)
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) // Fica escutando essa porta, quando ela for requisitada rode a função 
