import fs from "fs";
import path from "path";
const ROOT = path.resolve();

export class FileService {
  appendLine(name, cb) {
    fs.appendFile(path.join(ROOT, "file.txt"), name + "\n", "utf8", cb);
  }
  readFile(filename, cb) {
    fs.readFile(path.join(ROOT, filename), "utf8", cb);
  }
}