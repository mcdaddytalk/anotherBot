const crypto = require('crypto');

module.exports = class BaseSlashCommand {
    constructor(slashOptions) {
        this.type = 'CHAT_INPUT',
        this.name = slashOptions.name;
        this.application_id = slashOptions.appid | this.genUUID();
        this.description = slashOptions.description || '';
        this.options = slashOptions.options || [];
        this.default_permission = slashOptions.default_permission || true;
    }

    genUUID = () => {
        const uuid = crypto.randomUUID().toString().replace(/-/g, '');
        // console.log(uuid);
        return uuid
    }
}