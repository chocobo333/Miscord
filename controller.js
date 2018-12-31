module.exports = {
    execute(message) {
        //URLだけしか送れないチャンネルのID
        //直接コードにチャンネルID書き込むか環境変数使う
        //もしくはコマンドを用いてDBやテキストファイルで管理するけどめんどくさいのでめんどいXD
        const url_only_channel_id = 0 // このままだと動かないよ〜〜^^
        const url_pattern = /(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/

        if(message.channel.id == url_only_channel_id)
        {//<-僕はこのインデント(?)が好き
            if(!message.content.match(url_pattern))
            {
                message.delete()
                var msg = message.channel.send("In this channel, you allowed to send only message including URL")//英語苦手だからきもいかも、includeじゃなくてcontain?with?分かんね
                msg.delete(3000)
            }
        }

        if(message.content.match(/discord.gg/)) {
            message.delete(100)
        }
    }
}
