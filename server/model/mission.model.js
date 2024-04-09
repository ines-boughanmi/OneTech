module.exports =(connection,DataTypes)=>{
    const Mission = connection.define("mission",{
        title:DataTypes.STRING,
        description:DataTypes.STRING,
        start_date:DataTypes.DATE,
        end_date:DataTypes.DATE,
        type:DataTypes.STRING,
        progress:{
            type:DataTypes.ENUM,
            values:["To Do","In Progress","Done"],
            defaultValue:"To Do",
        },
        location:DataTypes.STRING,
    })
    
    return Mission
}