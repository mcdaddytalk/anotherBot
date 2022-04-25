const { DataTypes, Model } = require('sequelize');

module.exports = class Guilds extends Model {
    static init(sequelize) {
        return super.init(
            {
                guildId: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    field: 'guild_id',
                },
                guildName: {
                    type: DataTypes.STRING,
                    field: 'guild_name',
                },
                guildPrefix: {
                    type: DataTypes.STRING,
                    field: 'guild_prefix',
                },
                license: {
                    type: DataTypes.STRING,
                },
                key: {
                    type: DataTypes.STRING,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                },
            },
            {
                tableName: 'guilds',
                sequelize,
            }
        );
    }
};
