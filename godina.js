const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Godina = sequelize.define("godina",{
        nazivGod: {
            type: DataTypes.STRING,
            unique: true
        },
        nazivRepSpi : Sequelize.STRING,
        nazivRepVje : Sequelize.STRING
    })
    return Godina;
};