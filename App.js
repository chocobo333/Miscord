const conf = require('config')
// ログイン処理
const Discord = require('discord.js')
const client = new Discord.Client()
// local
//const token = conf.token
// heroku
const token = process.env.ENV_VAR_DISCORD_ID

client.on('ready', () => {
    console.log('ready...')
})

client.on('message', message => {
    // Bot自身の発言を無視する呪い
    if(message.author.bot) {
        return
    }

    // ここに後述のコードを記述

    // 特定の言葉に反応して返答する処理(完全一致)
    if (message.content === '寒いね') {
        let channel = message.channel
        let author = message.author.username
        let reply_text = '寒いね'
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error)
        return
    }

    // 特定の言葉に反応して返答する処理(部分一致)
    if(message.content.match(/おはよ/)) {
        let channel = message.channel
        let author = message.author.username
        let reply_text = '寒いね'
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error)
        return
    }

    // メンションなしでメッセージを送信する
    if(message.content === 'おはよ'){
        message.channel.send('おはようございます')
    }

    // 指定した語句を含む場合投稿を削除する
    if(message.content.match(/discord.gg/)) {
        message.delete(100)
    }

})
z

client.login(token)