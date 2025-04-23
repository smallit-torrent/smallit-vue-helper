const vscode = require('vscode');

function activate(context) {
  // 拡張機能が有効になったときに通知を表示
  vscode.window.showInformationMessage('Smallit Vue Helper extension is now active!');

  // 必要であれば、コマンドを追加することも可能です
  let disposable = vscode.commands.registerCommand('smallit-vue-helper.showMessage', function () {
    vscode.window.showInformationMessage('Smallit Vue Helper Extension is running!');
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};