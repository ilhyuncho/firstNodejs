const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, ( ) =>{
  console.log(`Start server:use ${port}`);
});

// 라우팅 설정
app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res){
  const user = url.parse(req.url, true).query;
  res.json(`[user] name : ${user.name}, age: ${user.age}`);
}

function feed(_, res){
  res.setHeader('Content-Type', 'text/html');
  res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
  `);
}
