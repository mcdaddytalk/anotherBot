const { DataTypes, Model } = require('sequelize');

module.exports = class Alarm extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                },
                alarmName: {
                    type: DataTypes.STRING,
                },
                alarmTime: {
                    type: DataTypes.JSON,
                },
            },
            {
                tableName: 'alarm',
                sequelize,
            }
        );
    }
};
