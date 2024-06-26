const db = require("../database");
const { Op } = require("sequelize");
module.exports = {
  searchRecords : async (req, res) => {
    try {   
      const searchResults = await db.Mission.findAll({
        where: { title : { [Op.like] : `%${req.params.searchTerm}%` }},
      });
      res.json(searchResults);
    } catch (error) {
      console.error('Error searching records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAllProjectsByMissionId : async (req,res) =>{
    try {
      let projects = []
      for ( key in req.body) {
        const data = await db.Project.findAll({where : {id : req.body[key]}})
        projects.push(...data)
      }
      res.json(projects)
    }
    catch (error) {
      console.log(error)
    }
  },
  getAllByProjectId: async (req, res) => {
    try {
      const allMissions = await db.Mission.findAll({where : {projectId: req.params.id}});
      res.json(allMissions);
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const allMissions = await db.Mission.findAll({});
      res.json(allMissions);
    } catch (error) {
      console.log(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const oneMission = await db.Mission.findOne({
        where: { id: req.params.id },
      });
      res.json(oneMission);
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const mission = await db.Mission.create(req.body);
      res.json(mission);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const mission = await db.Mission.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(mission);
    } catch (error) {
      console.log(error);
    }
  },

  remove: async (req, res) => {
    try {
      await db.Partition.destroy({
        where: { missionId: req.params.id },
      });
  
      const mission = await db.Mission.destroy({
        where: { id: req.params.id },
      });
  
      res.json(mission);
    } catch (error) {
      console.log(error);
    }
  },

  removeByProject: async (req, res) => {
    try {
      const missions = await db.Mission.findAll({
        where: { projectId: req.params.id },
      });

      for (const mission of missions) {
        await db.Partition.destroy({ where: { missionId: mission.id } });
      }
      const deletedMissions = await db.Mission.destroy({
        where: { projectId: req.params.id },
      });

      res.json({ deletedMissions });
    } catch (error) {
      console.log(error);
    }
  },
  getAllPartitionsByMission : async (req,res) => {
    try {
      let partitions = []
      for ( key in req.body) {
        const data = await db.Partition.findAll({where : {missionId : req.body[key]}})
        partitions.push(...data)
      }
      res.json(partitions)
    } catch (error) {
      console.log(error)
    }
  },
  getAllMissionsByPartiton : async (req, res) => {
    try {
      let missions = []
      for ( key in req.body) {
        const data = await db.Mission.findOne({where : {id : req.body[key]}})
        console.log(data);
        missions.push(data)
      }
      res.json(missions)
    } catch (error) {
      console.log(error);
    }
  },
  getMissionsByUser : async (req,res) =>{
    try {
      let missions = []
      const partitions = await db.Partition.findAll({where : {userId : req.params.id}})
      for (const partition of partitions) {
          const mission = await db.Mission.findOne({where : {id : partition.missionId }})
          missions.push(mission)
      }
      res.json(missions);
    } catch (error) {
      console.log(error);
    }
  },
  getUsersByMission : async (req,res) => {
    try {
      let users = []
      const partitions = await db.Partition.findAll({where : {missionId : req.params.id}})
      for (const partition of partitions) {
          const user = await db.User.findOne({where : {id : partition.userId }})
          users.push(user)
      }
      res.json(users)
    } catch (error) {
      console.log(error);
    }
  },
};
