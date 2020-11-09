const debug = require("../telegram").prototype

module.exports = {
    name: "purge",
    description: "🍓 Removes chat messages with a maximum limit of one hundred emails and a maximum of two weeks.",
    visibility: true,
    execute(msg) {
        let amount = parseInt(msg.content.replace(/\D+/g, ""));

        if (isNaN(amount) || !amount || amount < 2 || amount > 99) {
            return msg.reply(`❌ Please provide a number between 2 and 100 for the number of messages to delete.`);
        }
        if (!msg.member.hasPermission("ADMINISTRATOR") || msg.member.id !== "295862909714825217") {
            msg.channel.send("❌ Sorry, but you are not an administrator of this guild.");
            return 0;
        }

        msg.channel.bulkDelete(amount + 1, true).then(value => {
            msg.channel.send("Deleted " + value.size + " messages");
            setTimeout(() => {
                msg.channel.bulkDelete(1, true).catch((err) => {
                    debug.log(err, __filename);
                });
            }, 1000)
        }).catch((err) => {
            msg.channel.send(`❌ Error  ${err.message}`);
        });
    }
}
