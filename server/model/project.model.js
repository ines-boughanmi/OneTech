module.exports =(connection,DataTypes)=>{
    const Project = connection.define("project",{
        project_name:DataTypes.STRING,
        start_date:DataTypes.DATE,
        finish_date:DataTypes.DATE,
        project_subject:DataTypes.STRING,
    })
    return Project

}