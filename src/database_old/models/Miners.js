const { DataTypes, Model } = require('sequelize');

module.exports = class Guilds extends Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                guild_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                next_daily: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                daily_amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                mined: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {
                tableName: 'miners',
                timestamps: false,
                sequelize,
            }
        );
    }
};
