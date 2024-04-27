module.exports =(connection,DataTypes)=>{
    const User = connection.define("user",{
        name:DataTypes.STRING,
        lastname:DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
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
        image:{
            type:DataTypes.STRING,
            defaultValue:"https://static.thenounproject.com/png/1876981-200.png"
        },
        location:DataTypes.STRING,
    })

    return User

}