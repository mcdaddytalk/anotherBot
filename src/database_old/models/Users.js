const { DataTypes, Model } = require('sequelize');

module.exports = class Users extends Model {
    static init(sequelize) {
        return super.init(
            {
                guild_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                user_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                user_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                wallet: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                },
                bank: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                },
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ['user_id', 'guild_id'],
                    },
                ],
                tableName: 'users',
                timestamps: false,
                sequelize,
            }
        );
    }
};
