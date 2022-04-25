const Alarms = require('./Alarms');
const Application = require('./Application');
const CurrencyShop = require('./CurrencyShop');
const Guilds = require('./Guilds');
const Miners = require('./Miners');
const UserItems = require('./UserItems');
const Users = require('./Users');

const initModels = sequelize => {
    console.log('Initializing models...');
    Alarms.initModel(sequelize);
    Application.initModel(sequelize);
    CurrencyShop.initModel(sequelize);
    Guilds.initModel(sequelize);
    Miners.initModel(sequelize);
    UserItems.initModel(sequelize);
    Users.initModel(sequelize);

    UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });

    Guilds.belongsToMany(Users, { as: 'users', through: 'guild_users', foreignKey: 'id', otherKey: 'guild_id' });
    Users.belongsToMany(Guilds, { as: 'guilds', through: 'guild_users', foreignKey: 'id', otherKey: 'user_id' });
    Miners.belongsTo(Guilds, {
        as: 'guilds',
        foreignKey: 'guild_id',
    });
    Miners.belongsTo(Users, {
        as: 'users',
        foreignKey: 'user_id',
    });

    Reflect.defineProperty(Users.prototype, 'addItem', {
        value: async function addItem(item) {
            const userItem = await UserItems.findOne({
                where: {
                    guild_id: this.guildId,
                    user_id: this.userId,
                    item_id: item.id,
                },
            });

            if (userItem) {
                userItem.amount += 1;
                return await userItem.save();
            } else {
                return await UserItems.create({
                    guild_id: this.guildId,
                    user_id: this.userId,
                    item_id: item.id,
                    amount: 1,
                });
            }
        },
    });

    Reflect.defineProperty(Users.prototype, 'getItems', {
        value: async function getItems() {
            return await UserItems.findAll({
                where: { guild_id: this.guildId, user_id: this.userId },
                include: ['item'],
            });
        },
    });

    Reflect.defineProperty(Users.prototype, 'removeItem', {
        value: async function removeItem(item) {
            const userItem = await UserItems.findOne({
                where: {
                    guild_id: this.guildId,
                    user_id: this.userId,
                    item_id: item.id,
                },
            });

            if (userItem) {
                userItem.amount -= 1;
                if (userItem.amount <= 0) {
                    return await userItem.destroy();
                } else {
                    return await userItem.save();
                }
            }
        },
    });

    return {
        Alarms,
        Application,
        CurrencyShop,
        Guilds,
        Miners,
        UserItems,
        Users,
    };
};

module.exports = {
    Alarms,
    Application,
    CurrencyShop,
    Guilds,
    Miners,
    UserItems,
    Users,
    initModels,
};
