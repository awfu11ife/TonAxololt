const path = require('path')
const {Bot, GrammyError, HttpError, InlineKeyboard} = require('grammy');
const {I18n} = require('@grammyjs/i18n');
require('dotenv').config();

const bot = new Bot(process.env.BOT_API_KEY);

const i18n = new I18n({
    defaultLocale: "en",
    directory: 'locales',
  });
  
bot.use(i18n);

bot.api.setMyCommands([
    {
        command: 'start', description: 'Start mining!',
    },
    {
        command: 'help', description: 'If you need any help',
    },
    {
        command: 'top', description: 'Top referals',
    },
])

bot.use(require('./composers/commands.composer.js'))

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if(e instanceof GrammyError){
        console.error("Error in request", e.description);
    } else if (e instanceof HttpError){
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
})

bot.start();