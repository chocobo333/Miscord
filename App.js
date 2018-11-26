const fs = require('fs')
const conf = require('config')
// ログイン処理
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const colldowns = new Discord.Collection()
// local
// const token = conf.token
// const prefix = conf.prefix
// heroku
const token = process.env.ENV_VAR_DISCORD_ID
const prefix = process.env.ENV_VAR_DISCORD_PREFIX

// commands下のjsファイルのファイル名を配列で取得する。
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}


client.on('ready', () => {
    console.log('ready...')
})

client.on('message', message => {

    // Bot自身の発言を無視する
    if(!message.content.startsWith(prefix) || message.author.bot) return
    
    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    // エイリアスにも対応
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if(!command) return

    // サーバー上でのみ実行可能なコマンドの確認処理
    if(command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\t execute that command inside DMs')
    }

    // 引数が必要なコマンドの確認処理
    if(command.args && !args.length) {
        let reply = `You didn't provide any arguments. ${message.author}!`

        if(command.usage) {
            reply += `\n The proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        }

        return message.channel.send(reply)
    }
    
    // コマンドのクールタイム制御
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }
    const now = Date.now()
    const timestamp = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if(timestamp.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if( (now < expirationTime)) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }

    // コマンド実行部分
    try {
        command.execute(message, args)
    }
    catch (error) {
        console.error(error)
        message.reply('there was an error trying to execute that command!')
    }


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

client.login(token)