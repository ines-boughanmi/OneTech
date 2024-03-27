module.exports =(connection,DataTypes)=>{
    const Mission = connection.define("mission",{
        name:DataTypes.STRING,
        subject:DataTypes.STRING,
        date_mission:DataTypes.DATE,
        location:DataTypes.STRING,
    })

    return Mission

}