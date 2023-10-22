import fs from "fs";
import path from "path";
const root = "notes";


async function dfs(root) {
  const stack = [{ vertex: root, indent: 0 }];
  const visited = new Set();

  while (stack.length) {
    const { vertex, indent } = stack.pop();

    if (!visited.has(vertex)) {
      visited.add(vertex);

      const stats = await fs.statSync(vertex);

      if (stats.isFile()) {
        console.log(`${"  ".repeat(indent)}📰 ${onlyFileName(vertex)}`);
      } else {
        console.log(`${"  ".repeat(indent)}📁 ${onlyFileName(vertex)}`);
        const files = await fs.readdirSync(vertex);
        for (const file of files) {
          stack.push({ vertex: path.join(vertex, file), indent: indent + 1 });
        }
      }
    }
  }
}

function onlyFileName(path) {
  const index = path.lastIndexOf("\\");
  return path.slice(index + 1);
}

await dfs(root, 0);
