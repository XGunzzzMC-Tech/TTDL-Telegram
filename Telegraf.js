const Telegraf = require('node-telegram-bot-api');
const { ttdl } = require('btch-downloader');
const util = require('util');
const settings = require('./config');
const chalk = require('chalk');
const figlet = require('figlet');
const express = require('express'); 
const axios = require('axios'); // Tambahkan axios untuk HTTP request
const app = express();
const port = process.env.PORT || 8080;

// express 
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const data = {
    status: 'true',
    message: 'Bot Successfully Activated!',
    author: 'XGunzzzMC-Tech'
  };
  const result = {
    response: data
  };
  res.send(JSON.stringify(result, null, 2));
});

function listenOnPort(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying another port...`);
      listenOnPort(port + 1);
    } else {
      console.error(err);
    }
  });
}

listenOnPort(port);

// Bot config token 
let token = '7837139001:AAG-YKBQrlXHYB2ae7DKYA9EqeJqPH5X1Rw'  //replace this part with your bot token
const bot = new Telegraf(token, { polling: true });
let Start = new Date();

const logs = (message, color) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(chalk[color](`[${timestamp}] => ${message}`));
};

const Figlet = () => {
  figlet('teledl', { font: 'Block', horizontalLayout: 'default' }, function (err, data) {
    if (err) {
      console.log('Error:', err);
      return;
    }
    console.log(chalk.yellow.bold(data));
    console.log(chalk.yellow(`XGunzzzMC-Tech`));
  });
};

bot.on('polling_error', (error) => {
  logs(`Polling error: ${error.message}`, 'blue');
});

bot.setMyCommands([
    {
        command: '/start',
        description: 'Start a new conversation'
    },
    {
        command: '/runtime',
        description: 'Check bot runtime'
    },
    {
        command: '/ttvideo',
        description: 'TikTok Downloader Video'
    },
    {
        command: '/ttaudio',
        description: 'TikTok Downloader Audio'
    },
    {
        command: '/ttimage',
        description: 'TikTok Downloader Images'
    },
    {
        command: '/xai',
        description: 'ChatBot XAI'
    }
]);

// command
bot.onText(/^\/runtime$/, (msg) => {
  const now = new Date();
  const uptimeMilliseconds = now - Start;
  const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
  const uptimeMinutes = Math.floor(uptimeSeconds / 60);
  const uptimeHours = Math.floor(uptimeMinutes / 60);

  const From = msg.chat.id;
  const uptimeMessage = `Active : ${uptimeHours} hour ${uptimeMinutes % 60} minute ${uptimeSeconds % 60} second.`;
  if (settings.adminId.includes(String(msg.from.id))) {

  bot.sendMessage(From, uptimeMessage);
  } else {
      bot.sendMessage(From, 'Fitur Ini Khusus Owner Saya!!!');
    }
});

// Command Handler 'start'
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `┏━━ 𝗟𝗜𝗦𝗧 𝗠𝗘𝗡𝗨 ━⊜\n\n TikTok Downloader\n ∘ /ttvideo TikTok Downloader Video\n ∘ /ttaudio TikTok Downloader Audio\n\nAI ChatBot\n ∘ /xai ChatBot XAI\n
┗━━━━━━━━━━━━━━━━\n ∘ script by @XBotzzz`);
});

// Perintah TikTok Downloader
bot.onText(/\/ttvideo (.+)/, async (msg, match) => {
    const From = msg.chat.id;
    const tiktokUrl = match[1]; // Ambil URL TikTok dari input

    if (!tiktokUrl.includes('tiktok.com')) {
        bot.sendMessage(From, '❌ URL tidak valid. Pastikan itu adalah link TikTok.');
        return;
    }

    bot.sendMessage(From, '⏳ Sedang memproses video TikTok...');

    try {
        // Ambil data dari ttdl
        const data = await ttdl(tiktokUrl);
        const video = data.video[0]; // Video pertama
        const { title } = data;

        // Kirim video ke pengguna
        await bot.sendVideo(From, video, { caption: `🎥 ${title}` });

        // Tunggu beberapa detik sebelum kirim pesan tambahan
        await sleep(3000);

        // Kirim pesan tambahan
        await bot.sendMessage(From, 'Powered by @XBotzzz');
    } catch (error) {
        // Tangani kesalahan dan beri tahu pengguna
        bot.sendMessage(From, '❌ Terjadi kesalahan saat mengunduh video TikTok.');
        console.error(`[ ERROR ] ${From}: ${error.message}`);
    }
});

bot.onText(/\/ttaudio (.+)/, async (msg, match) => {
    const From = msg.chat.id;
    const tiktokUrl = match[1]; // Ambil URL TikTok dari input

    if (!tiktokUrl.includes('tiktok.com')) {
        bot.sendMessage(From, '❌ URL tidak valid. Pastikan itu adalah link TikTok.');
        return;
    }

    bot.sendMessage(From, '⏳ Sedang memproses audio TikTok...');

    try {
        // Ambil data dari ttdl
        const data = await ttdl(tiktokUrl);
        const audio = data.audio[0]; // Video pertama
        const { title_audio } = data;

        // Kirim video ke pengguna
        await bot.sendAudio(From, audio, { caption: `🎥 ${title_audio}` });

        // Tunggu beberapa detik sebelum kirim pesan tambahan
        await sleep(3000);

        // Kirim pesan tambahan
        await bot.sendMessage(From, 'Powered by @XBotzzz');
    } catch (error) {
        // Tangani kesalahan dan beri tahu pengguna
        bot.sendMessage(From, '❌ Terjadi kesalahan saat mengunduh video TikTok.');
        console.error(`[ ERROR ] ${From}: ${error.message}`);
    }
});


// Ketika ada pesan masuk
bot.onText(/\/xai (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const API_URL = 'https://restapii.rioooxdzz.web.id/api/gptlogic';

    // Jika pesan kosong atau bukan teks, abaikan
    if (!text) return;

    // Kirim pesan loading ke pengguna
    bot.sendMessage(chatId, '⏳ Memproses permintaan Anda...');

    try {
        // Panggil endpoint AI
        const response = await axios.get(API_URL, {
            params: {
                message: text,
                prompt: 'kamu adalah X-AI yang pemberani dan gagah, kamu diciptakan oleh XGunzzzMC untuk membantu semua orang' // Anda bisa tambahkan prompt default jika perlu
            }
        });
        
        console.log('Respons API:', response.data, '\nFrom:', chatId);


        // Ambil respons AI
        const reply = response.data.data.response || '❌ Maaf, saya tidak dapat memahami permintaan Anda.';
        bot.sendMessage(chatId, reply);

    } catch (error) {
        console.error('Error:', error.message);
        bot.sendMessage(chatId, '❌ Terjadi kesalahan saat memproses permintaan Anda.');
    }
});

// Endpoint AI
const API_URL = 'https://restapii.rioooxdzz.web.id/api/spotify';

// Ketika ada pesan masuk
bot.onText(/\/spotify (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];

    // Jika pesan kosong atau bukan teks, abaikan
    if (!text) return;

    // Kirim pesan loading ke pengguna
    bot.sendMessage(chatId, '⏳ Memproses permintaan Anda...');

    try {
        // Panggil endpoint AI
        const response = await axios.get(`https://restapii.rioooxdzz.web.id/api/spotify?url=${encodeURIComponent(text)}`);
        
        console.log('Respons API:', response.data, '\nFrom:', chatId);


        // Ambil respons AI
        const reply = response.data.data.response;
        bot.sendAudio(chatId, reply);

    } catch (error) {
        console.error('Error:', error.message);
        bot.sendMessage(chatId, '❌ Terjadi kesalahan saat memproses permintaan Anda.');
    }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
