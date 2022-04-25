module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('alarms', [
            {
                alarm_id: '664499234900410376',
                name: 'kbtalkin',
                alarm_name: 'test',
                alarm_time:
                    '{"days":[["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]],"hour":"10","minute":"00"}',
                enabled: true,
            },
        ]);
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('alarms', null, {});
    },
};
