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

const Project = require("./model/project.model")(connection,DataTypes)
const Car = require("./model/car.model")(connection,DataTypes)
const User = require("./model/user.model")(connection,DataTypes)
const Parking = require("./model/parking.model")(connection,DataTypes)
const Mission = require("./model/mission.model")(connection,DataTypes)
const Partition = require("./model/partition.model")(connection,DataTypes)


const db = {}
db.Partition = Partition
db.Mission = Mission
db.Parking = Parking
db.Project = Project
db.Car = Car
db.User = User



Parking.hasMany(Car)
Car.belongsTo(Parking)

Car.belongsTo(Mission)
Mission.belongsTo(Car)

Project.hasMany(Mission)
Mission.belongsTo(Project)

User.hasMany(Partition)
Partition.belongsTo(User)

Mission.hasMany(Partition)
Partition.belongsTo(Mission)





connection.sync({alter:true}).then(()=>{
    console.log("table created successfully")
}).catch((error)=>{
    console.log(error)
})


module.exports=db 