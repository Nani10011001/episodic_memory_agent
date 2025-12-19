import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pythonFile = path.resolve(__dirname, "ChatAgent", "main.py");

export const runAgent = (payload) => {
  return new Promise((resolve, reject) => {
    const python = spawn("python", [pythonFile]);

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (err) => {
      errorOutput += err.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(errorOutput);
      }

      try {
        resolve(JSON.parse(output));
      } catch {
        reject("Invalid JSON from Python");
      }
    });

    python.stdin.write(JSON.stringify(payload) + "\n");
    python.stdin.end();
  });
};
