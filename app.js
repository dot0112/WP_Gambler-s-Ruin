const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("baccarat"));
app.use(express.static("menu"));

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "menu", "main.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("파일 전송 오류:", err);
            res.status(500).send("파일을 찾을 수 없습니다.");
        }
    });
});

app.get("/baccarat/baccarat.html", (req, res) => {
    const filePath = path.join(__dirname, "baccarat", "baccarat.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("파일 전송 오류:", err);
            res.status(500).send("파일을 찾을 수 없습니다.");
        }
    });
});

app.listen(port, () => {
    console.log("http://localhost:3000");
});
