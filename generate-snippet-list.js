const fs = require('fs');
const path = require('path');

const snippetsDir = path.join(__dirname, 'snippets');
const outputFile = path.join(__dirname, 'SNIPPETS.md');

function collectSnippets(dir) {
  const rows = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      rows.push(...collectSnippets(fullPath));
    } else if (file.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      Object.entries(content).forEach(([snippetName, snippet]) => {
        const prefixes = Array.isArray(snippet.prefix) ? snippet.prefix.join(', ') : snippet.prefix;
        rows.push({
          file: file,
          name: snippetName,
          prefix: prefixes,
          description: snippet.description || ''
        });
      });
    }
  });

  return rows;
}

function generateMarkdown(rows) {
  const header = '| ファイル名 | スニペット名 | prefix | description |\n' +
                 '|------------|---------------|--------|-------------|';
  const lines = rows.map(row =>
    `| \`${row.file}\` | ${row.name} | \`${row.prefix}\` | ${row.description} |`
  );
  return [header, ...lines].join('\n');
}

const snippetRows = collectSnippets(snippetsDir);
const markdown = generateMarkdown(snippetRows);
fs.writeFileSync(outputFile, markdown, 'utf8');

console.log(`✅ SNIPPETS.md に ${snippetRows.length} 件のスニペットを出力しました。`);
