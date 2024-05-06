module.exports =(connection,DataTypes)=>{
    const Partition = connection.define("partition",{
        end_date : {
            type:DataTypes.DATE,
            allowNull:false
        }
    })

    return Partition

}