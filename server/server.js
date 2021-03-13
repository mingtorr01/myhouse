const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(express.json()); //bodyparser 역할 없으면 req.body 안먹힌다.
app.use(cors); // 서버와 클라이언트 사이의 크로스 도메인 헤더 라이브러리

const route = require("./routes/indexs");
app.use("/api", route); //라우팅

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
