module.exports = function(sequelize, DataTypes) {
    const Notification = sequelize.define('notification', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          type: {
            type: DataTypes.ENUM({
              values: [
                'text',
                'push'
              ]
            })
          },
          audience: {
            type: DataTypes.ENUM({
              values: [
                'group',
                'individual'
              ]
            })
          },
          content: {
            type: DataTypes.TEXT
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
    return Notification;
}