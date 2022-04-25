const BaseEvent = require('../../utils/structures/BaseEvent');
//const StateManager = require('../../utils/StateManager');
const { Modal, TextInputComponent, showModal } = require('discord-modals');

const modal = new Modal()
    .setCustomId('CloseModal')
    .setTitle('Ticket Close')
    .addComponents(
        new TextInputComponent()
            .setCustomId('CloseModal-reason')
            .setLabel('Reason')
            .setStyle('SHORT')
            .setMinLength(1)
            .setMaxLength(100)
            .setPlaceholder('Reason for closing the ticket')
            .setRequired(true)
    );

module.exports = class InteractionCreateEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'interactionCreate', { once: false });
    }

    async run(interaction) {
        // console.log(interaction);
        if (interaction.isCommand()) {
            if (!this.client.slashCommands.has(interaction.commandName)) return;

            // await interaction.defer({ ephemeral: false }).catch( () => {});
            const CategoryName = interaction.commandName;
            let cmd;
            try {
                if (this.client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
                    cmd = this.client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
                }
            } catch {
                if (this.client.slashCommands.has(CategoryName)) {
                    cmd = this.client.slashCommands.get(CategoryName);
                }
            }
            // const cmd = this.client.slashCommands.get(interaction.commandName);
            if (!cmd) return interaction.followUp({ content: 'An error has occurred', ephemeral: true });
            try {
                const args = [];
                if (interaction.options) {
                    interaction.options?.data.map(x => {
                        args.push(x.value);
                    });
                }
                cmd.run(this.client, interaction, args);
            } catch (error) {
                console.error(error.message);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        } else if (interaction.isButton()) {
            // console.log(`Interaction is a button`)
            if (interaction.customId === 'Button-claim') {
                interaction.reply({ content: 'A staff member will get back to you soon!' });
            } else if (interaction.customId === 'Button-cancel') {
                showModal(modal, {
                    client: this.client,
                    interaction: interaction,
                });
            }
        } else if (interaction.isSelectMenu()) {
            if (interaction.customId === 'class_select_drop') {
                const channel = interaction.guild.channels.cache.get('829721685531033663');
                channel.send(`<@${interaction.user.id}> plays:  [${interaction.values.toString()}]`);
                interaction.reply({ content: `you have made your selections`, ephemeral: true });
            }
        } else {
            console.log(interaction);
        }
    }
};
