module.exports = {
    apps: [
        {
            name: "bot",
            script: "npm run start",
            args: "start -p 5001",
            watch: false,
        },
    ],
};