const db = require("../database")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
module.exports = {

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
                        console.log(passCheck);
                        if (!passCheck) {
                            res.status(400).send({
                                message: "Passwords does not match",
                            
                            });
                        }
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
            const user = await db.User.update(req.body,{where:{id:req.params.id}})
            res.json(user)
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
    }
}