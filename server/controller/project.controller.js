const { Op } = require("sequelize");
const db = require("../database")
module.exports = {
    searchRecords : async (req, res) => {
        try {   
          const searchResults = await db.Project.findAll({
            where: { project_title : { [Op.like] : `%${req.params.searchTerm}%` }},
          });
          res.json(searchResults);
        } catch (error) {
          console.error('Error searching records:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      
    getAll:async (req,res)=>{
        try {
            const allProjects = await db.Project.findAll({})
            res.json(allProjects)
        } catch (error) {
            console.log(error)          
        }
    },
    
    getOne:async (req,res)=>{
        try {
            const oneProject = await db.Project.findOne({where : {id:req.params.id}})
            res.json(oneProject)
        } catch (error) {
            console.log(error)
        }
    },

    create:async (req,res)=>{
        try {
            const project = await db.Project.create(req.body)
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    },


    update:async (req,res)=>{
        try {
            const project = await db.Project.update(req.body,{where:{id:req.params.id}})
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    },

    remove:async (req,res)=>{
        try {
            const project = await db.Project.destroy({where:{id:req.params.id}})
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    },
    getAllMissionsByProject : async (req,res) => {
        try {
            const missions = await db.Mission.findAll({where : {projectId : req.params.id}})
            res.json(missions);
        } catch (error) {
            console.log(error);
        }
    },
    getProjectsByUser : async (req, res) => {
        try {
            let projects = []
            let missions = []
            const partitions = await db.Partition.findAll({where : {userId : req.params.id}})
            for (const partition of partitions) {
                const mission = await db.Mission.findOne({where : {id : partition.missionId  , type : 'normal'}})
                missions.push(mission)
            }
            for (const mission of missions) {
                if(mission){
                    const project = await db.Project.findOne({where : {id : mission.projectId}})
                    projects.push(project)
                }
            }
            res.json(projects);
        } catch (error) {
            console.log(error);
        }
    },
}