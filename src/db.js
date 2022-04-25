const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

module.exports = config => {
    const dbConfig = config.getDBConfig(env);
    return new Sequelize({
        ...dbConfig,
        logging: env === 'production' ? false : console.log,
        define: {
            underscored: true, // snake_case
        },
        pool: {
            max: 60,
            min: 0,
            idle: 10000,
        },
    });
};
