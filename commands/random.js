module.exports = {
    name: "random",
    descriptiom: "Generating random value",
    execute(maxValue, msg){
        maxValue = parseInt(maxValue.replace(/\D+/g, ""));
        maxValue < 32767 && maxValue > 0
        ? msg.channel.send(
        "Value from 0 to " +
          maxValue +
          " - " +
          Math.floor(Math.random() * maxValue)
      )
    : msg.channel.send("Error. Enter another value.");
    }
}