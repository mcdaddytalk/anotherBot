const { MessageEmbed, WebhookClient } = require('discord.js');
const chalk = require('chalk');
const {
    // black,
    blue,
    blueBright,
    cyan,
    // cyanBright,
    green,
    greenBright,
    grey,
    // magenta,
    magentaBright,
    redBright,
    yellow,
} = chalk;
const moment = require('moment');
const nodeLogger = require('simple-node-logger');
const ee = require('./embeds.js');
const Config = require('./config.js');

const config = new Config();

const username = config.getBotName();

require('better-logging')(console, {
    format: ctx => `${ctx.msg}`,
    color: {
        base: greenBright,
        type: {
            debug: magentaBright,
            info: magentaBright,
            log: magentaBright,
            error: blue,
            warn: blue,
        },
    },
});

const simpleLogger = nodeLogger.createRollingFileLogger({
    logDirectory: './logs',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'yyyy.MM.DD',
});

simpleLogger.setLevel('debug');

const errorWebhook = config.server.errorLogs ? new WebhookClient({ url: config.server.errorLogs }) : undefined;

const sendWebhook = (content, err) => {
    const embed = new MessageEmbed()
        .setColor(ee.ERROR_EMBED)
        .setAuthor({ name: err?.name || 'Error' })
        .setDescription(`\`\`\`${err?.stack || err}\`\`\``)
        .setFooter({ text: ee.footertext, iconURL: ee.footericon });

    if (err?.description) embed.addField('Description', content);
    if (err?.message) embed.addField('Message', err?.message);

    errorWebhook.send({
        username,
        avatarURL: ee.footericon,
        embeds: [embed],
    });
};

const convertToString = (level, content) => {
    const timestamp = `${moment().format('yyyy-MM-DD HH:mm:ss:SSS')}`;
    let levelString = '';
    switch (level) {
        case 'log':
            levelString = blueBright('info');
            break;
        case 'info':
            levelString = blueBright('info');
            break;
        case 'success':
            levelString = green(level);
            break;
        case 'warn':
            levelString = yellow('warning');
            break;
        case 'error':
            levelString = redBright(level);
            break;
        case 'debug':
            levelString = cyan(level);
            break;
        default:
            break;
    }
    let logstring = `${blueBright(username)} ${grey('|')} [${cyan(timestamp)}] ${grey('|')} [${levelString}] `;
    if (typeof content == 'string') {
        console.log(
            logstring,
            content
                .split('\n')
                .map(d => `${d}`.green)
                .join(`\n${logstring} `)
        );
    } else if (typeof content == 'object') {
        console.log(logstring, green(JSON.stringify(content, null, 3)));
    } else if (typeof content == 'boolean') {
        console.log(logstring, cyan(String(content)));
    } else {
        console.log(logstring, content);
    }
};

const sendLogs = (level, content, data) => {
    switch (level) {
        case 'log':
            convertToString(level, content);
            simpleLogger.info(content);
            break;

        case 'info':
            convertToString(level, content);
            simpleLogger.info(content);
            break;

        case 'success':
            convertToString(level, content);
            simpleLogger.info(content);
            break;

        case 'warn':
            convertToString(level, content);
            simpleLogger.warn(content);
            break;

        case 'error':
            convertToString(level, content);
            if (data) convertToString(level, data);
            simpleLogger.error(data ? data : content);
            if (errorWebhook) sendWebhook(content, data);
            break;

        case 'debug':
            convertToString(level, content);
            simpleLogger.debug(content);
            break;

        default:
            break;
    }
};

exports.success = content => sendLogs('success', content);
exports.warn = content => sendLogs('warn', content);
exports.error = (content, ex) => sendLogs('error', content, ex);
exports.debug = content => sendLogs('debug', content);
exports.log = content => sendLogs('log', content);
exports.info = content => sendLogs('info', content);
