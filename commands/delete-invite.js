module.exports = {
    name: 'delete-invite',
    description: 'Delete invite links',
    execute(message, args) {
        if(message.content.match(/discord.gg/)) {
            message.delete(100)
        }
    }
}