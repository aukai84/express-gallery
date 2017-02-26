'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    author: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Each post must haev an author..."
            }
        }
    },
    link: {
        type:  DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Link must be a URL..."
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        validate: {
             notEmpty: {
                msg: "Each post must have a description..."
            }
        }
    } ,
    shortLink: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Please edit link again..."
            }
        }
    },
    posted_by: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.User, {
            foreignKey: 'posted_by',
            as: 'user'
        });
      }
    }
  });
  return Photo;
};