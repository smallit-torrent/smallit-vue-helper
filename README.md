# 🧩 smallit-vue-helper

Vueファイル内でよく使うカスタムコンポーネントやユーティリティのスニペットを、補完候補からすばやく呼び出せるVSCode拡張です。  
ElementPlusや独自ライブラリ（torrent）に対応したコンポーネントスニペットが含まれています。

---

## ✨ 主な機能

- `<template>`, `<script>`, `<style>` セクション内でも補完可能
- `icon`, `al-box`, `tree-select` など豊富なスニペットを収録
- `prefix` を複数設定可能：例 `to-` でも補完OK
- `vue`, `vue-html`, `html`, `javascript`, `typescript`, `css` に対応

---

## 📦 インストール方法

### Marketplaceからインストール（推奨）

[🔗 Visual Studio Marketplace で開く](https://marketplace.visualstudio.com/items/?itemName=Smallit.smallit-vue-helper)

### vsixファイルからローカルインストール

```bash
code --install-extension ./smallit-vue-helper-0.0.X.vsix
```

---

## 🗣 対応言語・セクション

この拡張で提供されるスニペットは、以下の Vue ファイル内のセクションで利用可能です：

| セクションタグ |        対応言語モード        | 補完対象     |
|----------------|----------------------------|-------------|
| `<template>`   | `vue-html`, `html`         | ✅ 補完可能 |
| `<script>`     | `javascript`, `typescript` | ✅ 補完可能 |
| `<style>`      | `css`                      | ✅ 補完可能 |

> 💡 スニペットは `.vue` ファイルの各セクションの言語モードに合わせて登録されています。  
> ※一部の VSCode 拡張（例：Volar）では `html` や `css` として認識される場合があります。

---

## 🚀 スニペットの使い方

### 例1：アイコンコンポーネントの補完

入力:

```vue
icon
```

Enter で展開:

```vue
<icon icon-name="sample" />
```

---

## 📁 収録スニペット一覧

[`SNIPPETS.md`](./SNIPPETS.md)を参照してください。

> 🛠 この一覧は `npm run generate-snippet-list` で再生成できます。

---

## 🧑‍💻 開発・コントリビュート方法

開発者向けガイドは [`DEVELOPMENT.md`](./DEVELOPMENT.md) を参照してください。  
スニペットの追加・修正・バージョン更新・リリース方法を記載しています。

---

## 🧾 ライセンス

MIT  
詳細は [LICENSE](./LICENSE) をご確認ください。

---

## 📝 更新履歴

最新の更新履歴は [CHANGELOG.md](./CHANGELOG.md) を参照してください。

---

## 📮 フィードバック・バグ報告

不具合や改善要望は [Issuesページ](https://github.com/smallit-torrent/smallit-vue-helper/issues) にてお願いします。
```
