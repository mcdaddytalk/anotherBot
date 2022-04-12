const path = require('path');
const { readdirSync } = require('fs');
const fs = require('fs').promises;
const chalk = require('chalk');
const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');
const BaseSlashCommand = require('./structures/BaseSlashCommand');

async function registerCommands(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const Command = require(path.join(filePath, file));
            if (Command.prototype instanceof BaseCommand) {
                const cmd = new Command();
                client.commands.set(cmd.name, cmd);
                cmd.aliases.forEach((alias) => {
                    client.commands.set(alias, cmd);
                });
                if (client.config.botSettings.show_loaded_commands) {
                    client.logger.success(`Loaded Command: ${cmd.name}`)
                }
            }
        }
    }
}

// async function registerSlashCommands(client, dir = '') {
//     const filePath = path.join(__dirname, dir);
//     const files = await fs.readdir(filePath);
//     for (const file of files) {
//         const stat = await fs.lstat(path.join(filePath, file));
//         if (stat.isDirectory()) registerSlashCommands(client, path.join(dir, file));
//         if (file.endsWith('.js')) {
//             const SlashCommand = require(path.join(filePath, file));
//             if (SlashCommand.prototype instanceof BaseSlashCommand) {
//                 const slashCmd = new SlashCommand();
//                 client.slashCommands.set(slashCmd.name, slashCmd);
//             }
//         }
//     }
// }

async function registerSlashCommands(client, dir = '') {
    try {
        client.allCommands = []; //raw Slash Commands Data
        // const filePath = path.join(__dirname, dir);
        // readdirSync(filePath).filter((file) => file.endsWith('.js')).forEach((file) => {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if (stat.isDirectory()) registerSlashCommands(client, path.join(dir, file));
            if (file.endsWith('.js')) {
                // console.log(file);
                const SlashCommand = require(path.join(filePath, file));
                if (SlashCommand.prototype instanceof BaseSlashCommand) {
                    const slashCmd = new SlashCommand();
                    // console.log(slashCmd)
                    if (slashCmd.name && slashCmd.description) {
                        let Command = new SlashCommandBuilder().setName(String(slashCmd.name).toLowerCase()).setDescription(slashCmd.description);
                        if (slashCmd.options && slashCmd.options.length > 0) {
                            for (const option of slashCmd.options) {
                                if (option.name && option.description) {
                                    switch(option.type.toUpperCase()) {
                                        case 'USER':
                                            Command.addUserOption((op) =>
                                                op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                            );
                                            break;
                                        case 'INTEGER':
                                            if (option.choices && option.choices.length > 0) {
                                                Command.addIntegerOption((op) =>
                                                    op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                                        .addChoices(option.choices.map(c => [String(c[0]).replace(/\s+/g, '_').toLowerCase(), parseInt(c[1])])),
                                                )
                                            } else {
                                                Command.addIntegerOption((op) =>
                                                    op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                                )
                                            }
                                            break; 
                                        case 'STRING':
                                            if ( option.choices && option.choices.length > 0) {
                                                Command.addStringOption((op) =>
                                                    op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                                    .addChoices(option.choices.map(c => [String(c[0]).replace(/\s+/g, '_').toLowerCase(), String(c[1])])),
                                                )
                                            } else {
                                                Command.addStringOption((op) =>
                                                    op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                                )   
                                            }
                                            break;
                                        case 'CHANNEL':
                                            Command.addChannelOption((op) =>
                                                op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                            )
                                            break;
                                        case 'ROLE':
                                            Command.addRoleOption((op) =>
                                                op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                            )
                                            break;
                                        case 'BOOLEAN':
                                            Command.addBooleanOption((op) =>
                                                op.setName(String(option.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.description).setRequired(option.required)
                                            )
                                            break;
                                        default:
                                            console.log(`A Option is missing the Name or/and the Description of ${SlashCommand.name}`)
                                    }
                                }
                            }
                        }
                        // console.log(Command);
                        client.allCommands.push(Command.toJSON());
                        client.slashCommands.set(slashCmd.name, slashCmd)
                        if (client.config.botSettings.show_loaded_slashcommands) {
                            client.logger.success(`Loaded Slash Command: ${slashCmd.name}`)
                        }
                    } else {
                        client.logger.error(`error -> missing a help.name, or help.name is not a string.`.brightRed, slashCmd);
                    }
                }
            }
        };
    } catch (e) {
        console.log(chalk.bgRed(String(e.stack)))
    }
}

async function registerEvents(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        delete require.cache[file];
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const { name } = path.parse(file);
            // console.log(name);
            const Event = require(path.join(filePath, file));
            if (!isClass(Event)) throw new TypeError(`Event ${name} doesn't export a class!`);
            const event = new Event(client, name);
            if (!(event instanceof BaseEvent)) throw new TypeError(`Event ${name} doesn't belong in Events`);
            client.events.set(event.name, event);
            event.emitter[event.type](event.name, (...args) => event.run(...args));
            if (client.config.botSettings.show_loaded_events) {
                client.logger.success(`Loaded Event: ${event.name}`)
            }
        }
    }
}

function isClass(input) {
    return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
}

module.exports = {
    registerCommands,
    registerEvents,
    registerSlashCommands
};
