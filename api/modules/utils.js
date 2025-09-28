import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load user-facing text from lang file
const { greeting } = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "lang", "en", "en.json"), "utf8")
);

export class CurrentDate {
    constructor(name = "Yuho") {
        this.name = this.escapeHtml(name);
        this.greeting = greeting;
    }

    escapeHtml(str = "") {
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
    }

    getDate() {
        return new Date().toString();
    }

    getHtml() {
        const msg = this.greeting.replace("%1", this.name);
        return `<!doctype html>
        <html>
            <head><meta charset="utf-8"><title>Server Date</title></head>
            <body>
            <p style="color: blue">${msg} ${this.getDate()}</p>
            </body>
        </html>`;
    }
}