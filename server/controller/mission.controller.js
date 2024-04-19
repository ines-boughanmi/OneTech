const db = require("../database")
module.exports = {
    getAll:async (req,res)=>{
        try {
            const allMissions = await db.Mission.findAll({})
            res.json(allMissions)
        } catch (error) {
            console.log(error)          
        }
    },
    
    getOne:async (req,res)=>{
        try {
            const oneMission = await db.Mission.findOne({where : {id:req.params.id}})
            res.json(oneMission)
        } catch (error) {
            console.log(error)
        }
    },

    create:async (req,res)=>{
        try {
            const mission = await db.Mission.create(req.body)
            res.json(mission)
        } catch (error) {
            console.log(error)
        }
    },


    update:async (req,res)=>{
        try {
            const mission = await db.Mission.update(req.body,{where:{id:req.params.id}})
            res.json(mission)
        } catch (error) {
            console.log(error)
        }
    },

    remove:async (req,res)=>{
        try {
            const mission = await db.Mission.destroy({where:{id:req.params.id}})
            res.json(mission)
        } catch (error) {
            console.log(error)
        }
    },
    removeByProject:async (req,res)=>{
        try {
            const mission = await db.Mission.destroy({where:{projectId:req.params.id}})
            res.json(mission)
        } catch (error) {
            console.log(error)
        }
    }

    
}