const {Composer, InlineKeyboard} = require('grammy');
const composer = new Composer();

composer.command('start', async (ctx) => {
    const linkKeyboard = new InlineKeyboard()
    .webApp(ctx.t("play"), `${process.env.WEB_APP_LINK}`)
    .url(ctx.t("join"), `${process.env.COMMUNITY_LINK}`);

    await ctx.reply(ctx.t("welcome")
    ,{
        reply_markup: linkKeyboard
    });
})

composer.command('help', async (ctx) => {
    await ctx.reply(ctx.t("help"))
})

composer.command('top', async (ctx) => {
    await ctx.reply(ctx.t("top"))
})

module.exports = composer