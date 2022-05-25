'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: true,
            }

        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING

    }, {
        indexes: [
            { fields: ['username'], unique: true }
        ],
        // defaultScope: {
        //     attributes: { exclude: ['password'] },
        // }
    });

    User.associate = function(models) {

        User.belongsTo(models.Role, {
            foreignKey: 'role_id'
        });

    };
    return User;
};