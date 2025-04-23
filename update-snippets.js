const fs = require('fs');
const path = require('path');

// snippets フォルダのパス（smallit-vue-helper内のsnippetsフォルダ）
const snippetsDir = path.join(__dirname, 'snippets');

// package.json のパス（smallit-vue-helper内のpackage.json）
const packageJsonPath = path.join(__dirname, 'package.json');

// 対象とする言語のリスト（必要に応じて追加可能）
const targetLanguages = ['vue', 'vue-html', 'html', 'javascript', 'typescript', 'css'];

// 再帰的にディレクトリをスキャンして .json ファイルを取得する関数
function getSnippetFiles(dir) {
  let snippetFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      snippetFiles = snippetFiles.concat(getSnippetFiles(fullPath));
    } else if (file.endsWith('.json')) {
      snippetFiles.push(fullPath);
    }
  });

  return snippetFiles;
}

// snippets フォルダ内の .json ファイルを再帰的に取得
const snippetFiles = getSnippetFiles(snippetsDir);

// package.json を読み込む
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (error) {
  console.error('Error reading package.json:', error);
  process.exit(1);
}

// contributes.snippets の初期化
if (!packageJson.contributes) {
  packageJson.contributes = {};
}

if (!Array.isArray(packageJson.contributes.snippets)) {
  packageJson.contributes.snippets = [];
}

// 対象言語ごとにすべてのスニペットを生成
const newSnippets = [];
snippetFiles.forEach(file => {
  const relativePath = `./snippets/${path.relative(snippetsDir, file).replace(/\\/g, '/')}`;
  targetLanguages.forEach(language => {
    newSnippets.push({ language, path: relativePath });
  });
});

// 重複を避けるために Map を使って重複排除
const newSnippetsMap = new Map();
newSnippets.forEach(snippet => {
  const key = `${snippet.language}:${snippet.path}`;
  newSnippetsMap.set(key, snippet);
});

// 現在のスニペット一覧から削除する分を除去
let removedCount = 0;
packageJson.contributes.snippets = packageJson.contributes.snippets.filter(existingSnippet => {
  const key = `${existingSnippet.language}:${existingSnippet.path}`;
  const exists = newSnippetsMap.has(key);
  if (!exists) {
    removedCount++;
    console.log(`Removed snippet: [${existingSnippet.language}] ${existingSnippet.path}`);
  }
  return exists;
});

// 新しいスニペットを追加
let addedCount = 0;
newSnippetsMap.forEach(snippet => {
  const exists = packageJson.contributes.snippets.some(existing => (
    existing.language === snippet.language && existing.path === snippet.path
  ));
  if (!exists) {
    packageJson.contributes.snippets.push(snippet);
    addedCount++;
    console.log(`Added snippet: [${snippet.language}] ${snippet.path}`);
  }
});

// 更新があったら package.json を書き込み
if (addedCount > 0 || removedCount > 0) {
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ package.json has been updated with new multi-language snippets!');
  } catch (error) {
    console.error('Error writing package.json:', error);
    process.exit(1);
  }
} else {
  console.log('No changes were made to the snippets.');
}
