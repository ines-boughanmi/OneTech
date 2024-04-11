const db = require("../database")
module.exports = {
    getAll:async (req,res)=>{
        try {
            const allPartitions = await db.Partition.findAll({})
            res.json(allPartitions)
        } catch (error) {
            console.log(error)          
        }
    },
    
    getOne:async (req,res)=>{
        try {
            const onePartition = await db.Partition.findOne({where : {id:req.params.id}})
            res.json(onePartition)
        } catch (error) {
            console.log(error)
        }
    },

    create:async (req,res)=>{
        try {
            const Partition = await db.Partition.create(req.body)
            res.json(Partition)
        } catch (error) {
            console.log(error)
        }
    },


    update:async (req,res)=>{
        try {
            const Partition = await db.Partition.update(req.body,{where:{id:req.params.id}})
            res.json(Partition)
        } catch (error) {
            console.log(error)
        }
    },

    remove:async (req,res)=>{
        try {
            const Partition = await db.Partition.destroy({where:{id:req.params.id}})
            res.json(Partition)
        } catch (error) {
            console.log(error)
        }
    }
}