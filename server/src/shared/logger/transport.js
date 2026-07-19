import pino from "pino";

const transport = pino.transport({
    targets: [
        {
            target: "pino-pretty",
            level: "debug",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname"
            }
        },
        {
            target: "pino/file",
            level: "info",
            options: {
                destination: "./logs/app.log",
                mkdir: true
            }
        },
        {
            target: "pino/file",
            level: "error",
            options: {
                destination: "./logs/error.log",
                mkdir: true
            }
        },
        {
            target: "pino/file",
            level: "info",
            options: {
                destination: "./logs/access.log",
                mkdir: true
            }
        }
    ]
});

export default transport;