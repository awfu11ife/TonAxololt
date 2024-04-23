require('dotenv').config();
const {Bot, GrammyError, HttpError, InlineKeyboard} = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

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

bot.command('start', async (ctx) => {
    const linkKeyboard = new InlineKeyboard()
    .webApp('🎯Play now', `${process.env.WEB_APP_LINK}`)
    .url('Join community', `${process.env.COMMUNITY_LINK}`);

    await ctx.reply(`Hello Miner!
Come to us faster and start your mining jorney!
✅🇺🇸 Chat - t.me/tonpotato_community
✅🇺🇸 Channel - t.me/ton_potato_eng

✅🇷🇺 Канал - t.me/potato_ton
✅🇨🇳 聊天 - t.me/tonpotato_ch_comm

To see the list of available commands /help`
    ,{
        reply_markup: linkKeyboard
    });
})

bot.command('help', async (ctx) => {
    await ctx.reply(`/start - Start the bot, instructions, social networks
/top - Get leaderboard of the best players`)
})

bot.command('top', async (ctx) => {
    await ctx.reply(`There's no one here yet:(`)
})

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