# README

## 概要

Vaingloryギルド「Pulses」のDiscordサーバー上で利用するBot。  

## コマンド

```bash
// 依存関係のインストール
npm install

// ローカルでのアプリの起動
node App.js
```

## フォルダ構成

```bash
root/
    ├ App.js　          // mainファイル
    ├ controller.js     // BAN等の禁止行為制御
    ├ greet.js          // コマンドを使用しないメンションでの会話用
    ├ commands/         // コマンドを格納するディレクトリ
    │       ├ help.js
    │       └ args-info.js
    └ config/           // ローカルで実行する際に利用する変数
```