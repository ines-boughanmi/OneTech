module.exports =(connection,DataTypes)=>{
    const User = connection.define("user",{
        name:DataTypes.STRING,
        lastname:DataTypes.STRING,
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        role:{
            type:DataTypes.ENUM,
            values:["CONSULTANT","PROJECT_MANAGER","PARKING_MANAGER"],
            defaultValue:"CONSULTANT"
        },
        phone:DataTypes.STRING,
        validity:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        image:DataTypes.STRING,
        location:DataTypes.STRING,
    })

    return User

}