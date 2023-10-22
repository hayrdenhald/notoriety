import fs from "fs";
import path from "path";
const root = "notes";
const webRoot = "web_notes";


async function dfs(root) {
  const links = [];

  // const stack = [{ vertex: root, indent: 0 }];
  const stack = [{ vertex: root, indent: 0 }];
  const visited = new Set();

  while (stack.length) {
    const { vertex, indent } = stack.pop();

    if (!visited.has(vertex)) {
      visited.add(vertex);

      const stats = await fs.statSync(vertex);

      if (stats.isFile()) {
        console.log(`${"  ".repeat(indent)}📰 ${onlyFileName(vertex)}`);
        const link = {
          path: vertex,
          fileName: onlyFileName(vertex),
          title: onlyFileName(vertex),
        };
        links.push(link);
      } else {
        console.log(`${"  ".repeat(indent)}📁 ${onlyFileName(vertex)}`);
        const files = await fs.readdirSync(vertex);
        for (const file of files) {
          stack.push({ vertex: path.join(vertex, file), indent: indent + 1 });
        }
      }
    }
  }

  return links;
}

function onlyFileName(path) {
  const index = path.lastIndexOf("\\");
  return path.slice(index + 1);
}

export async function getLinks() {
  return await dfs(root, 0);
}
