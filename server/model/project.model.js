module.exports =(connection,DataTypes)=>{
    const Project = connection.define("project",{
        project_title:DataTypes.STRING,
        description:DataTypes.STRING,
        budget:DataTypes.STRING,
        start_date:DataTypes.DATE,
        finish_date:DataTypes.DATE,
        material_resources:DataTypes.STRING,
        human_resources:DataTypes.STRING,
    })
    return Project

}