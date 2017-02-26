'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "username must exist..."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "password must exist..."
            }
        }
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