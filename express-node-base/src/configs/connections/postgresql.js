const { Sequelize } = require('sequelize');
const config = require('../config')

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
        logging: true,
        dialect: 'postgres',
        migrationStorageTableName: "sequelizeMeta",
        host: config.DB_HOST,
        port: config.DB_PORT,
        pool: {
            min: 1,
            max: 10,
            idle: 9000,
            acquire: 10000,
            evict: 10000

        },
        timezone: '+07:00',
        define: {
            'timestamps': false
        }
    })

module.exports = sequelize;