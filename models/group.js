module.exports = function(sequelize, DataTypes) {
    const Group = sequelize.define('group', {
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
    });
    
    return Group;
}
