module.exports =(connection,DataTypes)=>{
    const User = connection.define("user",{
        name:DataTypes.STRING,
        lastname:DataTypes.STRING,
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        role:DataTypes.STRING,
        phone:DataTypes.STRING,
        validity:DataTypes.BOOLEAN,
        image:DataTypes.STRING,
        location:DataTypes.STRING,
    })

    return User

}