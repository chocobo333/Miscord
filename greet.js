module.exports = {
    execute(message) {
        // 特定の言葉に反応して返答する処理(部分一致)
        if(message.content.match(/おはよ/)) {
            let channel = message.channel
            let author = message.author.username
            let reply_text = 'Good Morning'
            message.reply(reply_text)
                .then(message => console.log(`Sent message: ${reply_text}`))
                .catch(console.error)
        return
        }
        else {
            let channel = message.channel
            let author = message.author.username
            let reply_text = 'I\'m starting final protocol... 3. 2. 1'
            message.reply(reply_text)
                .then(message => console.log(`Sent message: ${reply_text}`))
                .catch(console.error)
        return
        }
    }
}