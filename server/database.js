const {Sequelize,DataTypes} = require("sequelize")

const connection = new Sequelize (
    "onetech",
    "root",
    "root",
    {
        host:'localhost',
        dialect :'mysql'
    }
)

connection.authenticate()
.then(()=>{
    console.log("db connected"); 
})
.catch((err)=>{
    console.log(err);
})

 
const db = {}

module.exports=db 