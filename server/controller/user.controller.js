const db = require("../database")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
module.exports = {
    searchRecords : async (req, res) => {
        try {
          const searchResults = await db.User.findAll({
            where: {
                [Op.or]: [
                  { name: { [Op.like]: `%${req.params.searchTerm}%` } },
                  { lastname: { [Op.like]: `%${req.params.searchTerm}%` } }
                ]
              }
          });
          res.json(searchResults);
        } catch (error) {
          console.error('Error searching records:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
    getOneByEmail : async (req,res) => {
        try {
            const User = await db.User.findOne({where:{email:req.body.email}})
            res.json(User)
        }   
        catch (error) {
            console.log(error)
        }
    },

    register : async (req, res) => {
        try {
            bcrypt.hash(req.body.password, 10)
                .then((hashedPass) => {
                    db.User.create({
                        ...req.body,
                        password: hashedPass
                    })
                        .then((result) =>
                            res.status(201).json({
                                message: "User Created Successfully",
                                result,
                            })
                        )
                        .catch((error) => {
                            res.status(500).send({
                                message: "Error creating User",
                                error,
                            });
                        });
                });
        } catch (error) {
            res.status(500).send({
                message: "Password was not hashed successfully",
                error,
            });
        }
    },


    passCheck : async (req,res) =>{
        try {
            const User = await db.User.findOne({where:{email:req.body.email}})
            bcrypt.compare(req.body.password, User.password)
               .then((passCheck) => {
                    if (!passCheck) {
                        res.status(200).send({
                            message: "Password Incorrect", 
                            
                        });
                    }
                    else {
                        res.status(200).json({
                            message: ""
                        });
                    }
                    
                })
        } catch (error) {
            console.log(error);
        }
    },

    login  : async (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
            .then((User) => {
                console.log(User);
                bcrypt
                    .compare(req.body.password, User.password)
                    .then((passCheck) => {
                        if (!passCheck) {
                            res.status(400).send({
                                message: "Passwords does not match", 
                            
                            });
                        }
                        else {
                            const Token = jwt.sign(
                                {
                                    UserId: User.id,
                                    email: User.email,
                                },
                                "secretKeyForJWT@2024",
                                {expiresIn : "24h"}
                            );
                            res.status(200).json({
                                message: "Login Successfull",
                                UserId: User.id,
                                token: Token
                            });
                        }
                        
                    })
                    .catch((error) => {
                        res.status(400).send({
                            message: "Error creating token",
                            error,
                        });
                    });
            })
            .catch((error) => {
                res.status(404).send({
                    message: "Email not found",
                    error,
                });
            });
    },




    getAll:async (req,res)=>{
        try {
            const allUsers = await db.User.findAll({})
            res.json(allUsers)
        } catch (error) {
            console.log(error)          
        }
    },

    getOne:async (req,res)=>{
        res.status(200).send(req.user)
    },

    create:async (req,res)=>{
        try {
            const user = await db.User.create(req.body)
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },


    update:async (req,res)=>{
        try {
            if(req.body.password){
                bcrypt.hash(req.body.password , 10).then((hashPass)=>{
                    const user =  db.User.update({...req.body,password:hashPass},{where:{id:req.params.id}})
                    res.json(user)  
                })
            }
            else{
                const user = await db.User.update(req.body,{where:{id:req.params.id}})
                res.json(user)
            }
        } catch (error) {
            console.log(error)
        }
    },

    remove:async (req,res)=>{
        try {
            const user = await db.User.destroy({where:{id:req.params.id}})
            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },
    prepUserStat : async (req,res) => {
        try {
            let stat = []
            const users = await db.User.findAll({where:{ role : "CONSULTANT" , validity : true}})
            if(req.body.month){
                for(let user of users) {
                    let length = 0
                    const partitions = await db.Partition.findAll({where : {userId : user.id}})
                    for(let partition of partitions) {
                        console.log(String(partition.end_date));
                        if(String(partition.end_date).split(" ")[1] === req.body.month){
                            length++
                        }
                    }
                    stat.push({user : user.name + " " + user.lastname , stats : length})
                }
            }
            else{
                for(let user of users) {
                    const partitions = await db.Partition.findAll({where : {userId : user.id}})
                    stat.push({user : user.name + " " + user.lastname , stats : partitions.length})
                }
            }
            res.json(stat)
        } catch (error) {
            console.log(error);
        }
    }
}