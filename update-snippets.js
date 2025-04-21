const fs = require('fs');
const path = require('path');

// snippets フォルダのパス（torrent-helper内のsnippetsフォルダ）
const snippetsDir = path.join(__dirname, 'snippets');  // __dirnameがtorrent-helperを指す前提

// package.json のパス（torrent-helper内のpackage.json）
const packageJsonPath = path.join(__dirname, 'package.json');

// 再帰的にディレクトリをスキャンして .json ファイルを取得する関数
function getSnippetFiles(dir) {
  let snippetFiles = [];
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // サブディレクトリ内のファイルも探索
      snippetFiles = snippetFiles.concat(getSnippetFiles(fullPath));
    } else if (file.endsWith('.json')) {
      // .json ファイルを見つけたらリストに追加
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

// snippets 配列がすでに存在するか確認し、なければ空の配列を設定
if (!packageJson.contributes) {
  packageJson.contributes = {};
}

if (!packageJson.contributes.snippets) {
  packageJson.contributes.snippets = [];
}

// 新しいスニペットを追加
const newSnippets = snippetFiles.map(file => ({
  language: 'vue',  // 必要に応じて変更 (html, js, vueなど)
  path: `./snippets/${path.relative(snippetsDir, file).replace(/\\/g, '/')}` // 絶対パスを相対パスに変更
}));

// 既存のスニペットから削除するファイルを確認
let removedCount = 0; // 削除されたスニペット数をカウント
packageJson.contributes.snippets = packageJson.contributes.snippets.filter(snippet => {
  const exists = newSnippets.some(newSnippet => newSnippet.path === snippet.path);
  if (!exists) {
    // 存在しないスニペットファイルのパスは削除
    removedCount++;
    console.log(`Removed snippet: ${snippet.path}`);
  }
  return exists; // 存在するスニペットは残す
});

// 新しいスニペットを追加
let addedCount = 0; // 追加されたスニペット数をカウント
newSnippets.forEach(snippet => {
  const exists = packageJson.contributes.snippets.some(existingSnippet => existingSnippet.path === snippet.path);
  if (!exists) {
    packageJson.contributes.snippets.push(snippet);
    addedCount++;
    console.log(`Added snippet: ${snippet.path}`);
  }
});

// 変更があった場合のみ package.json を更新
if (addedCount > 0 || removedCount > 0) {
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('package.json has been updated with new snippets!');
  } catch (error) {
    console.error('Error writing package.json:', error);
    process.exit(1);
  }
} else {
  console.log('No changes were made to the snippets.');
}
