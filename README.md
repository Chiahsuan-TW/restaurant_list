# 餐廳清單

一個使用 Node.js及 Express 打造的餐廳搜尋平台

## 環境建置及需求

* Node.js v10.15.0
* Express v4.17.1 
* npm v6.4.1
* nodemon v2.0.7
* express-handlebars v5.2.1

## 安裝與執行步驟

1. 打開你的Terminal，複製此專案至你的資料夾中

```
git clone https://github.com/Chiahsuan-TW/restaurant_list.git
```
2. 進入此專案資料夾

```
cd restaurant_list
```
3. 安裝npm套件

```
在 Terminal 輸入 npm install 指令
```
4. 安裝nodemon

```
在 Terminal 輸入 nodemon app.js 指令
```

5. 透過nodemon啟動伺服器，執行app.js檔案

```
當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
The Express server is running on http://localhost:3000
```

## 功能描述

* 首頁可查看所有餐廳的評分
* 點選其中一家餐廳可看到詳細資訊(如:地址、電話、簡述)
* 於搜尋欄位輸入餐廳名稱可查詢到符合的餐廳
