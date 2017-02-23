module.exports = function(sequelize, DataTypes){
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "username must exist"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "password must exist"
                }
            }
        }
    });
    return User;
};