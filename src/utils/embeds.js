const Config  = require('./config.js');
const config = new Config();
module.exports = {
  color: "#03fcd3",
  TRANSPARENT_EMBED: "#36393F",
  SUCCESS_EMBED: "#00A56A",
  ERROR_EMBED: "#D61A3C",
  WARNING_EMBED: "#F7E919",
  TICKET_CREATE: "#068ADD",
  TICKET_CLOSE: "#068ADD",
  MUTE_EMBED: "#102027",
  UNMUTE_EMBED: "#4B636E",
  KICK_EMBED: "#FF7961",
  SOFTBAN_EMBED: "#AF4448",
  BAN_EMBED: "#D32F2F",
  wrongcolor: "#e01e01",
  footertext: `${config.getBotName()} | ${config.getBotVersion()}`,
  footericon: "https://cdn.discordapp.com/avatars/784455295127650354/833032e3a59ec4d17a2710c433526b41.webp"
}