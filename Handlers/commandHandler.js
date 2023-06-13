async function loadCommands(client) {
    const { loadFiles } = require("../Functions/fileLoader");

    await client.commands.clear();
    await client.subCommands.clear();

    let commandsArray = [];

    const Files = await loadFiles("Commands");
    
    Files.forEach((file) => {
        const command = require(file);

        if(command.subCommand)
        return client.subCommands.set(command.subCommand, command);

        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());
    });

    client.application.commands.set(commandsArray);

    return console.log("\x1b[36m%s\x1b[0m", "Komutlar Yüklendi ✅")
}

module.exports = { loadCommands };