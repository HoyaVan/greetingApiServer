import http from "http";
import { URL } from "url";
import { CurrentDate } from "./modules/utils.js";
import { FileService } from "./modules/files.js";
import { strings } from "./modules/strings.js";

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
  if (req.method === "POST" && url.pathname === "/COMP4537/labs/3/writeFile/") {
    const text = url.searchParams.get("text");
    if (!text) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(strings.badRequestMissingText);
      return;
    }
    fileService.appendLine(text, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(strings.serverErrorWrite);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(strings.appendedToFile.replace("%1", text));
      return;
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
          res.end(strings.notFound404File.replace("%1", filename));
        } else {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(strings.serverErrorRead);
        }
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(strings.notFound);
}).listen(PORT, () => {
  console.log(strings.serverRunning.replace("%1", PORT));
});
