module.exports =(connection,DataTypes)=>{
    const Car = connection.define("car",{
        brand:DataTypes.STRING,
        car_model:DataTypes.STRING,
        license_plate:DataTypes.STRING,
        image:DataTypes.STRING,
        car_category:DataTypes.STRING,
        car_availability:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        car_condition:{
            type:DataTypes.ENUM,
            values:["Maintenance","In service","Out Of service"],
            defaultValue:"In service"
        },
        color:DataTypes.STRING,
        seat_availability:DataTypes.INTEGER,
        
    })
    return Car

}