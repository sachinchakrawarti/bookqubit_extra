import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database Path
const dbPath = path.join(
    __dirname,
    "../database/bookqubit_database_test/bookqubit_database_test.db"
);

// Open SQLite Database
const db = new Database(dbPath);

app.get("/", (req, res) => {
    res.send("BookQubit Server Running 🚀");
});

// Get all books
app.get("/books", (req, res) => {
    try {
        const books = db.prepare("SELECT * FROM books").all();
        res.json(books);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Get one book
app.get("/books/:id", (req, res) => {
    try {
        const book = db
            .prepare("SELECT * FROM books WHERE book_id = ?")
            .get(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});