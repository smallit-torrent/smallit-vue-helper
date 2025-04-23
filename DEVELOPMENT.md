# 開発者向けガイド - smallit-vue-helper

この拡張は、Vueファイルで利用可能なスニペットを簡単に呼び出すためのVSCode拡張機能です。  
本ガイドでは、スニペットの追加・修正・削除や拡張の更新・リリース方法について説明します。

---

## 📁 ディレクトリ構成

```
torrent-helper/
├─ snippets/                   # スニペット定義ファイル（*.json）
├─ update-snippets.js          # スニペット登録用スクリプト
├─ generate-snippet-list.js    # SNIPPETS.md 自動生成スクリプト
├─ SNIPPETS.md                 # 自動生成されるスニペット一覧
├─ package.json
├─ CHANGELOG.md
└─ README.md
```

---

## ✍️ スニペットの編集方法

### 🔹 スニペットを追加する方法

#### 方法①：新しい JSON ファイルを作成
1. `snippets/` フォルダ内に `.json` ファイルを新規作成  
   例：`snippets/alert.json`

2. 以下のように定義：
```json
{
  "Alert Component": {
    "prefix": "alert",
    "body": "<alert type=\"$1\">$2</alert>",
    "description": "Simple alert component"
  }
}
```

#### 方法②：既存の JSON ファイルに追加
既存のファイル（例：`icon.json`）にオブジェクトを追記：
```json
{
  "Icon": {
    "prefix": "icon",
    "body": "<icon icon-name=\"$1\" />",
    "description": "ElementPlus icon"
  },
  "Custom Icon": {
    "prefix": "custom-icon",
    "body": "<custom-icon name=\"$1\" />",
    "description": "Custom icon for torrent"
  }
}
```

---

### 🔸 スニペットを削除する方法

#### 方法①：JSONファイルごと削除
- `snippets/button.json` などを削除すると、そのファイルのスニペットは全て無効になります。

#### 方法②：JSONファイル内の定義を削除
特定のスニペットだけ削除したい場合、そのオブジェクトをJSONファイルから削除します。

---

### 🔧 スニペットを編集する方法

#### 対象項目と意味：

```json
{
  "Svg-Icon": {
    "prefix": ["svg-icon"],
    "body": "<svg-icon icon-class=\"$1\"/>",
    "description": "svg-icon (torrent only)"
  }
}
```

| 項目        | 内容                        | 説明                                      |
|-------------|-----------------------------|-------------------------------------------|
| `"prefix"`  | `"svg-icon"`                | 補完候補の呼び出しワード                  |
| `"body"`    | `"<svg-icon icon-class..."` | 実際に挿入されるコード                    |
| `"description"` | `"svg-icon..."`         | 補完候補リストに表示される説明文         |

#### 複数行の場合の書き方：

```json
"body": [
  "<template>",
  "  <svg-icon icon-class=\"$1\"/>",
  "</template>"
]
```

---

## 🔃 スニペット変更後にやること

### 🔁 登録の更新
編集が終わったら、以下のコマンドで `package.json` に反映します：

```bash
npm run update-snippets
```

これにより `vue`, `vue-html`, `html`, `javascript`, `typescript`, `css` 向けに自動的にスニペットが登録されます。

### 📝 スニペット一覧の生成
```bash
npm run generate-snippet-list
```

`SNIPPETS.md` に全スニペットの prefix / description 一覧が自動生成されます。  

---

## 📦 拡張機能のビルド・リリース手順

### 1. バージョン番号を更新

`package.json` の `"version"` （5行目にある）を 1つ上げてください：

```json
"version": "0.0.3"
```

---

### 2. CHANGELOG.md を更新

`CHANGELOG.md` に更新内容を記載してください。

例：
```markdown
## [0.0.2] - 2025-04-24

### Added

- 「to-xxxx」でもスニペットを呼び出せるようになりました。

### Fixed

- Vueファイル内の <template></template> や <script></script> などのタグ内で動作しないバグを修正しました。

### Removed

- 一部不要なファイルを削除しました。
```

---

### 3. ビルドコマンドの実行

以下を実行して `.vsix` ファイルを作成します：

```bash
npm run build
```

※ `update-snippets` → `generate-snippet-list` → `vsce package` を順に実行します。

---

## 🔁 その他のおすすめ運用

- スニペット修正後は `npm run update-snippets` を忘れずに。
- 不要ファイルが `.vsix` に含まれないよう `.vscodeignore` を管理。
- `package-lock.json` は `npm install` で自動更新されます。
- 公開する場合は `vsce publish` かマーケットのウェブサイトから公開してください。

---

## 🙋‍♂️ よくある質問（FAQ）

**Q. スニペットが補完候補に出ません！**  
A. `update-snippets.js` を必ず実行し、`vue`, `vue-html`, `javascript` に正しく登録されているか確認してください。

**Q. バージョンを変え忘れた！**  
A. Marketplace に公開できません。再度 `package.json` を修正して `.vsix` を作成し直してください。

---

## 📚 参考リンク

- [Keep a Changelog](https://keepachangelog.com/)
- [VSCE CLI](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

```

---