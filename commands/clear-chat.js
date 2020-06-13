module.exports = {
  name: "clear-chat",
  description: "Clearing chat",
  execute(msg) {
    let amount = parseInt(msg.content.replace(/\D+/g, ""));
    if (isNaN(amount) || !amount || amount <= 2 || amount > 100) {
      return msg.reply(
        `Please provide a number between 2 and 100 for the number of messages to delete`
      );
    }
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.channel.send("You are not administrator");
      return 0;
    }
    msg.channel.bulkDelete(amount, true).catch((err) => {
      console.err(err);
      msg.channel.send(
        "there was an error trying to prune messages in this channel!"
      );
    });
  }
}
