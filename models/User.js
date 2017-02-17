module.exports = function(sequelize, DataTypes){
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validte: {
                notEmpty: {
                    msg: "username must exist"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validte: {
                notEmpty: {
                    msg: "password must exist"
                }
            }
        }
    });
    return User;
};