module.exports = function(sequelize, DataTypes){
    let Photo = sequelize.define("Photo", {
        author: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Each post must have an author..."
                }
            }
        },
        link: {
            type: DataTypes.STRING(1234),
            validate: {
                notEmpty: {
                    msg: "Each post must have a link..."
                },
                isUrl: {
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
        },
        shortLink: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Please edit link again..."
                }
            }
        }
    });
    return Photo;
};