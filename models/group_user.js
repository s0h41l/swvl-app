module.exports = function(sequelize, DataTypes) {
    const GroupUser = sequelize.define('group_user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
            model: 'users',
            key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
            model: 'groups',
            key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
    });

    return GroupUser
}