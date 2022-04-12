const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('canvas', 'test', [], [],
    10,
    false,
    false,
    '');
    }

    async run(client, message, args) {

        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 70;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                context.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (context.measureText(text).width > canvas.width - 300);
        
            // Return the result to use in the actual canvas
            return context.font;
        };

        const fontColor = '#D91B54';

        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        
        const background = await Canvas.loadImage('./src/images/steampunk.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
            
        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        
        context.font = '28px sans-serif';
		context.fillStyle = fontColor;
		context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(canvas, `${message.member.displayName}!`);
        context.fillStyle = fontColor;
        context.fillText(`${message.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

        context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		const avatar = await Canvas.loadImage(client.user.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 25, 25, 200, 200);
            
        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
        
        message.reply({ files: [attachment] });

    }

}