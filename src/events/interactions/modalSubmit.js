const BaseEvent = require('../../utils/structures/BaseEvent');
const { Formatters } = require('discord.js');

module.exports = class ModelSubmitEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'modalSubmit', { once: false });
    }

    async run(modal) {
        if (modal.customId === 'CloseModal') {
            const firstResponse = modal.getTextInputValue('CloseModal-reason');
            await modal.deferReply({ ephemeral: true });
            modal.followUp({
                content: 'Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', firstResponse),
                ephemeral: true,
            });
        }
    }
};
