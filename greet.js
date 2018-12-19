module.exports = {
    execute(message, args) {
        // 特定の言葉に反応して返答する処理(部分一致)
        if(message.content.match(/^(@アルファちゃん)\B*(おはよ)+/)) {
            let channel = message.channel
            let author = message.author.username
            let reply_text = 'Good Morning'
            message.reply(reply_text)
                .then(message => console.log(`Sent message: ${reply_text}`))
                .catch(console.error)
        return
        }
    }
}