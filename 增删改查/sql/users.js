//test是一个测试文件 不要在项目中使用  



const db = require('./db.js')


const productionSchema = new db.mongoose.Schema({
  "username": { type: String },
  "password": { type: String },
})


module.exports = db.mongoose.model("users", productionSchema)
