module.exports = function(sequelize, DataTypes){
    let Photo = sequelize.define("Photo", {
        author: DataTypes.STRING,
        link: DataTypes.STRING(1234),
        description: DataTypes.STRING,
        shortLink: DataTypes.STRING
    });
    return Photo;
};