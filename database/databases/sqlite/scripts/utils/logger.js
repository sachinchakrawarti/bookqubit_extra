const COLORS = {
    reset: "\x1b[0m",

    bright: "\x1b[1m",

    dim: "\x1b[2m",

    red: "\x1b[31m",

    green: "\x1b[32m",

    yellow: "\x1b[33m",

    blue: "\x1b[34m",

    magenta: "\x1b[35m",

    cyan: "\x1b[36m",

    white: "\x1b[37m"
};

function color(text, c) {
    return `${COLORS[c]}${text}${COLORS.reset}`;
}

function line(char = "=", length = 70) {
    console.log(char.repeat(length));
}

function blank() {
    console.log("");
}

function title(text) {

    blank();

    line();

    console.log(color(text, "cyan"));

    line();

}

function success(text) {

    console.log(
        color("✔ " + text, "green")
    );

}

function warning(text) {

    console.log(
        color("⚠ " + text, "yellow")
    );

}

function error(text) {

    console.log(
        color("✖ " + text, "red")
    );

}

function info(text) {

    console.log(
        color("ℹ " + text, "blue")
    );

}

function created(text) {

    console.log(
        color("+ " + text, "green")
    );

}

function copied(text) {

    console.log(
        color("➜ " + text, "cyan")
    );

}

function skipped(text) {

    console.log(
        color("- " + text, "dim")
    );

}

function value(label, value) {

    console.log(
        color(label.padEnd(18), "yellow") +
        value
    );

}

function object(obj) {

    console.log(
        JSON.stringify(
            obj,
            null,
            4
        )
    );

}

function schemaCreated(name, type, location) {

    title("SCHEMA CREATED");

    value("Schema", name);

    value("Type", type);

    value("Location", location);

    line();

}

function finished() {

    blank();

    console.log(
        color("Done.", "green")
    );

    blank();

}

module.exports = {

    line,

    blank,

    title,

    success,

    warning,

    error,

    info,

    created,

    copied,

    skipped,

    value,

    object,

    schemaCreated,

    finished

};