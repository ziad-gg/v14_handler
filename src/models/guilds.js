const mongoose = require('mongoose');

const guildsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  language: String,
});

guildsSchema.statics.setLanguage = async function (guildId, language) {
  let oldData = await this.findOne({ guildId });
  if (language) language = language.toLowerCase();
  if (oldData) {
    oldData.language = language;
    return await oldData.save();
  } else {
    return await this.create({ guildId, language });
  }
}


const Guilds = mongoose.model("Guilds", guildsSchema);

module.exports = Guilds;