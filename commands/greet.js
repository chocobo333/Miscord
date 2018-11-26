module.exports = {
    name: 'greet',
    description: 'greeting automatic',
    execute(message, args) {
        // 特定の言葉に反応して返答する処理(部分一致)
        if(message.content.match(/おはよ/)) {
        let author = message.author.username
        let reply_text = `${author}寒いね`
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error)
        return
    }
    }
}