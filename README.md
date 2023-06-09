# Discord.js v14 Handler

This is a simple Discord.js v14 handler that you can use to manage your bot's commands and events.

## Getting Started

To use this handler, you'll need to have Node.js and Discord.js v14 installed on your system.

## <a href="https://glitch.com/edit/#!/vdjs-handler">Glitch Fork</a> <a href="https://replit.com/@Gup-gungun/v14handler">Replit Fork</a>
<hr>

1- Clone this repository or download the source code as a ZIP file.

2- Open a terminal or command prompt in the project folder.

3- Run the following command to install the dependencies:

```bash
npm install
```

4- Rename the `.env.example` file to `.env` and fill in your bot token and prefix.
5- Edit the `src/config.js` file to customize your bot's settings.
6- Get your MongoDB connection URL by following these steps:
   1. Go to the MongoDB website and sign up for an account if you don't have one already.
   2. Create a new project and add a new cluster to it.
   3. Click on the "Connect" button for the cluster you just created.
   4. Select "Connect your application".
   5. Choose the driver and version you want to use (e.g., Node.js v4.0 or later).
   6. Copy the connection string provided in the code snippet.
   7. Replace the `<password>` and `<dbname>` placeholders in the connection string with your actual password and database name.
   8. Use the updated connection string as your MongoDB connection URL in your code.

6- Run the following command to start the bot:
```js
npm start
```
## Note 
<h6>If your are using glitch use setCategory method in each command because handler.djs package can not get categorys name in glitch</h6>

## Adding Commands

To add a new command, create a new file in the `commands` folder with the following template:

```js
const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");

module.exports = new CommandBuilder()
.setName('command-name')
.setDescription('command-description')
.setExecution(Execute)

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) {
   // Command code here
}
```
Replace `command-name` with the name of your command, Command description with a short description of your command, and // Command code here with your command's code.

## Adding Events
To add a new event, create a new file in the events folder with the following template:

```js
const { Events, Client } = require("discord.js");
const { EventBuilder } = require("handler.djs");

module.exports = new EventBuilder()
.setEvent(Events['event-name'])
.setExecution(Execute) 

/**
 * @param {Client} client 
 */

async function Execute(...args) {
  // Event code here
}
```
Replace `event-name` with the name of your event and // Event code here with your event's code.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request. All contributions are welcome!

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.