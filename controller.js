module.exports = {
    execute(message) {
        if(message.content.match(/discord.gg/)) {
            message.delete(100)
        }
    }
}