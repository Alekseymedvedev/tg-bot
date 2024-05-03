module.exports = {
    apps: [
        {
            name: "bot_client",
            script: "npm run start",
            args: "start -p 3001",
            watch: false,
        },
    ],
};