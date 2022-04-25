const BaseCommand = require('../../utils/structures/BaseCommand');
const { Application } = require('../../../database/models');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('test', 'test', []);
    }

    async run(client, message) {
        const application = await Application.create({
            authorId: message.author.id,
            messageId: message.id,
        });
        const applicationId = String(application.getDataValue('applicationId')).padStart(4, 0);
        message.channel.send('Test command works:  ' + applicationId);
    }
};
