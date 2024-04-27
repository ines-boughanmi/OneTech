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
    },
    getUsersByMission: async (req, res) => {
        try {
          const partitions = await db.Partition.findAll({ where: { missionId: req.params.id } });
          const usersPromises = partitions.map(async (partition) => {
            const user = await db.User.findOne({ where: { id: partition.userId } });
            return user;
          });
          const users = await Promise.all(usersPromises);
          res.json(users);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getPartitionsByMission: async (req, res) => {
        try {
          const partitions = await db.Partition.findAll({ where: { missionId: req.params.id } });
          res.json(partitions);  
        } catch (error) {
            console.log(error);
        }
    },
    updateUsersByMission : async (req, res) => {
        try {
           await db.Partition.destroy({ where: { missionId: req.params.id } });
           for ( key in req.body ) {
             await db.Partition.create({   userId: req.body[key] , missionId: req.params.id});  
          }
          res.status(200).send()
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getPartitionsByUserId : async (req,res) => {
        try {
          const partitions = await db.Partition.findAll({ where: { userId: req.params.id } });
          res.json(partitions);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllUserByPartition : async (req,res) => {
        try {
            let users = []
            for ( key in req.body) {
                const user = await db.User.findOne({where:{id:req.body[key]}})
                users.push(user)
            }
            res.json(users)
        } catch (error) {
            console.log(error);
        }
    }

}