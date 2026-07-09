const fs = require("fs");
const path = require("path");

/**
 * Check if a path exists
 */
function exists(target) {
    return fs.existsSync(target);
}

/**
 * Create directory recursively
 */
function ensureDir(dir) {
    if (!exists(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}

/**
 * Copy folder recursively
 */
function copyDirectory(source, destination) {
    ensureDir(path.dirname(destination));

    fs.cpSync(source, destination, {
        recursive: true
    });
}

/**
 * Copy file
 */
function copyFile(source, destination) {
    ensureDir(path.dirname(destination));

    fs.copyFileSync(source, destination);
}

/**
 * Read file as UTF-8
 */
function readFile(file) {
    return fs.readFileSync(file, "utf8");
}

/**
 * Write file
 */
function writeFile(file, content) {
    ensureDir(path.dirname(file));

    fs.writeFileSync(file, content, "utf8");
}

/**
 * Append file
 */
function appendFile(file, content) {
    ensureDir(path.dirname(file));

    fs.appendFileSync(file, content, "utf8");
}

/**
 * Delete file
 */
function deleteFile(file) {
    if (exists(file)) {
        fs.unlinkSync(file);
    }
}

/**
 * Delete directory recursively
 */
function deleteDirectory(dir) {
    if (exists(dir)) {
        fs.rmSync(dir, {
            recursive: true,
            force: true
        });
    }
}

/**
 * Empty directory
 */
function emptyDirectory(dir) {
    if (!exists(dir)) return;

    fs.readdirSync(dir).forEach((item) => {
        const current = path.join(dir, item);

        if (fs.statSync(current).isDirectory()) {
            deleteDirectory(current);
        } else {
            fs.unlinkSync(current);
        }
    });
}

/**
 * List files recursively
 */
function listFiles(dir) {
    let files = [];

    if (!exists(dir)) {
        return files;
    }

    fs.readdirSync(dir).forEach((item) => {

        const current = path.join(dir, item);

        const stat = fs.statSync(current);

        if (stat.isDirectory()) {
            files = files.concat(listFiles(current));
        } else {
            files.push(current);
        }

    });

    return files;
}

/**
 * List directories recursively
 */
function listDirectories(dir) {

    let directories = [];

    if (!exists(dir)) {
        return directories;
    }

    fs.readdirSync(dir).forEach((item) => {

        const current = path.join(dir, item);

        const stat = fs.statSync(current);

        if (stat.isDirectory()) {

            directories.push(current);

            directories = directories.concat(
                listDirectories(current)
            );
        }

    });

    return directories;
}

/**
 * Read JSON file
 */
function readJSON(file) {
    return JSON.parse(readFile(file));
}

/**
 * Write JSON file
 */
function writeJSON(file, object) {
    writeFile(
        file,
        JSON.stringify(object, null, 4)
    );
}

/**
 * Rename
 */
function rename(oldPath, newPath) {
    ensureDir(path.dirname(newPath));

    fs.renameSync(oldPath, newPath);
}

/**
 * Move
 */
function move(source, destination) {
    rename(source, destination);
}

/**
 * File size
 */
function fileSize(file) {
    return fs.statSync(file).size;
}

/**
 * File modified time
 */
function modified(file) {
    return fs.statSync(file).mtime;
}

/**
 * Is directory
 */
function isDirectory(target) {
    return exists(target) && fs.statSync(target).isDirectory();
}

/**
 * Is file
 */
function isFile(target) {
    return exists(target) && fs.statSync(target).isFile();
}

module.exports = {

    exists,

    ensureDir,

    copyDirectory,

    copyFile,

    readFile,

    writeFile,

    appendFile,

    deleteFile,

    deleteDirectory,

    emptyDirectory,

    listFiles,

    listDirectories,

    readJSON,

    writeJSON,

    rename,

    move,

    fileSize,

    modified,

    isDirectory,

    isFile

};