const { DataTypes, Model } = require('sequelize');

module.exports = class Alarms extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                },
                alarmId: {
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
                enabled: {
                    type: DataTypes.BOOLEAN,
                },
                createdAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
            },
            {
                tableName: 'alarms',
                sequelize,
            }
        );
    }
};
