const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    try {
        const response = await axios.post(
            "https://api.gptfree.net/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "تو یک هوش مصنوعی طبیعی و گرم هستی شبیه paradox." },
                    { role: "user", content: text }
                ]
            }
        );

        const reply = response.data.choices[0].message.content;
        bot.sendMessage(chatId, reply);

    } catch (err) {
        console.log(err);
        bot.sendMessage(chatId, "یه اشتباه کوچولو شد عزیزم، دوباره بفرست ❤️");
    }
});
