module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM({
                values: [
                    'rider',
                    'customer'
                ]
            }),
            default: 'customer'
        },
        password: DataTypes.STRING,
        language: {
            type: DataTypes.ENUM({
                values: [
                    'english',
                    'urdu'
                ]
            }),
            default: 'english'
        },
    });

    return User;
}