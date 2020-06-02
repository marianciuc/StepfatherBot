module.exports = {
  name: "clear-chat",
  descriptiom: "Clearing chat",
  execute(msg) {
    let amount = parseInt(msg.content.replace(/\D+/g, ""));
    if (isNaN(amount) || !amount || amount <= 2 || amount > 100) {
      return msg.reply(
        `Please provide a number between 2 and 100 for the number of messages to delete`
      );
    }
    msg.channel.bulkDelete(amount, true).catch((err) => {
      console.err(err);
      msg.channel.send(
        "there was an error trying to prune messages in this channel!"
      );
    });
  }
}
