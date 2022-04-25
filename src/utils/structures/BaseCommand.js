module.exports = class BaseCommand {
    constructor(name, category, aliases, permissions, cooldown, args, guildOnly, usage) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.permissions = permissions;
        this.cooldown = cooldown;
        this.args = args;
        this.guildOnly = guildOnly;
        this.usage = usage;
    }
};
