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
          }
    });
    return Notification;
}