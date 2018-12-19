module.exports = {
    execute(message, args) {
        if(message.content.match(/discord.gg/)) {
            message.delete(100)
        }
    }
}