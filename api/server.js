import http from "http";
import { URL } from "url";
import { CurrentDate } from "./modules/utils.js";
import { FileService } from "./modules/files.js";

const PORT = process.env.PORT || 3000;
const fileService = new FileService();

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // --- getDate ---
  if (req.method === "GET" && url.pathname === "/COMP4537/labs/3/getDate/") {
    const name = url.searchParams.get("name") || "Yuho";
    const cd = new CurrentDate(name);
    const html = cd.getHtml();
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }

  // --- writeFile ---
  if (req.method === "GET" && url.pathname === "/COMP4537/labs/3/writeFile/") {
    const text = url.searchParams.get("text");
    if (!text) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad Request: missing ?text=...");
      return;
    }
    fileService.appendLine(text, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Server Error: Unable to write to file");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Appended "${text}" to file.txt`);
    });
    return;
  }

  // --- readFile ---
  if (req.method === "GET" && url.pathname.startsWith("/COMP4537/labs/3/readFile/")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const filename = parts[parts.length - 1];
    fileService.readFile(filename, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`404 Not Found: file "${filename}"`);
        } else {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Server Error: Unable to read file");
        }
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
