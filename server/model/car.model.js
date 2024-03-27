module.exports =(connection,DataTypes)=>{
    const Car = connection.define("car",{
        brand:DataTypes.STRING,
        car_model:DataTypes.STRING,
        car_category:DataTypes.STRING,
        license_plate:DataTypes.STRING,
        car_condition:DataTypes.STRING,
        car_availability:DataTypes.BOOLEAN,
        color:DataTypes.STRING,
        image:DataTypes.STRING,
        seat_availability:DataTypes.INTEGER,
        
    })
    return Car

}