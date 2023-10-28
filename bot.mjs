import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import https from 'https';
import appConfig from './config.mjs';

const bot = new TelegramBot(appConfig.Telegram.KEY, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Type /subscribe to get daily weather updates.');
});

bot.onText(/\/subscribe/, (msg) => {
    const chatId = msg.chat.id;
    let subscribedUsers = loadSubscribedUsers();
    if (!subscribedUsers.includes(chatId)) {
        subscribedUsers.push(chatId);
        saveSubscribedUsers(subscribedUsers);
    }
    bot.sendMessage(chatId, 'Subscribed to daily weather updates!');
});


function loadSubscribedUsers() {
    try {
        const data = fs.readFileSync('subscribed_users.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveSubscribedUsers(users) {
    fs.writeFileSync('subscribed_users.json', JSON.stringify(users));
}

// Function to send daily weather updates
export default function sendDailyWeather() {
    let subscribedUsers = loadSubscribedUsers();

    for (const chatId of subscribedUsers) {
        try {
            const url = `${appConfig.Weather.API}${appConfig.Weather.KEY}`;

            https.get(url, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    console.log(data);
                    const weatherData = JSON.parse(data);
                    console.log(weatherData);
                    const temperature = weatherData.list[0].main.temp;
                    const description = weatherData.list[0].weather[0].description;

                    const message = `Here's your daily weather update:\n\nTemperature: ${temperature}°C\nDescription: ${description}`;

                    bot.sendMessage(chatId, message);
                });
            }).on('error', (error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    }
}


