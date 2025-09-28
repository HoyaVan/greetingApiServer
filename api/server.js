import http from "http";
import { URL } from "url";
import { CurrentDate } from "./modules/utils.js";

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/COMP4537/labs/3/getDate/") {
    const name = url.searchParams.get("name") || "Yuho";
    const cd = new CurrentDate(name);
    const html = cd.getHtml();

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
