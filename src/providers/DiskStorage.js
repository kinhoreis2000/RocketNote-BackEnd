const fs = require('fs') // é do node, serve para lidar com manipulação de arquivo

const path = require('path')
const uploadConfig = require("../configs/upload")

class DisckStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )
    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    
    try {
        await fs.promises.stat(filePath)
    } catch{
      return
    }

    await fs.promises.unlink(filePath)
  }
}


module.exports = DisckStorage