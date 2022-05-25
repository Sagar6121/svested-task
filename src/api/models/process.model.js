module.exports = (sequelize, DataTypes) => {
    const Process = sequelize.define('Process', {
        randAlphabet: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        indexes: [
            { fields: ['randAlphabet']}
        ],
        timestamps: false
    });

    return Process;
};