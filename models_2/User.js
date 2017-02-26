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
        },
        age: {
            type: DataTypes.INTEGER,
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Photo, {
                    foreignKey: 'posted_by'
                });
            }
        }
    });
    return User;
};

