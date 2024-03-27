const db = require("../database")
module.exports = {
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
    }
}