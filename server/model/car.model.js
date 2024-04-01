module.exports =(connection,DataTypes)=>{
    const Car = connection.define("car",{
        brand:DataTypes.STRING,
        car_model:DataTypes.STRING,
        license_plate:DataTypes.STRING,
        image:DataTypes.STRING,
        car_category:DataTypes.STRING,
        car_availability:DataTypes.BOOLEAN,
        car_condition:DataTypes.STRING,
        color:DataTypes.STRING,
        seat_availability:DataTypes.INTEGER,
        
    })
    return Car

}