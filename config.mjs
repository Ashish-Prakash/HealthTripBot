import dotenv from 'dotenv';
dotenv.config();
const appConfig = {
    Telegram : {
        KEY : process.env.TELEGRAM_BOT
    },

    Weather : {
        KEY: process.env.WEATHER_KEY,
        API: process.env.WEATHER_API
    }

}

export default appConfig;