const fs = require('fs')
const conf = require('config')
const controller = require('./controller.js')
const greet = require('./greet.js')
// ログイン処理
const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()
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
    //bot地震の発言を無視する
    if(message.author.bot) return

    // 禁止ワードチェック
    controller.execute(message, args)

    // 会話コマンドチェック
    if(message.content.startsWith(chatPrefix)){
        greet.execute(message, args)
    }

    // コマンド以外の場合はreturn
    if(!message.content.startsWith(prefix)) return
    
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

})

client.on("guildMemberAdd", (member) => {
    member.addRole('523815544017780765')
})

client.login(token)