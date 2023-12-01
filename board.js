// 간단 게시판 만들기
const express = require("express")
const app = express();

let posts = [];           // 게시글 리스트로 사용할 posts에 빈 리스트 할당

// req.body를 사용하려면 JSON 미들웨어를 사용 ( 사용 하지 않으면 undefined로 반환 )
app.use(express.json());  // JSON 미들웨어 활성화


// 익스프레스에서 미들웨어는 요청과 응답 사이에 로직을 추가할 수 있는 함수를 제공 (요청 전후 처리를 지원하는 역할)


// POST요청시 컨텐츠 타입이 application/x-www-form-urlencoded인 경우 파싱( post요청은 대부분이 x-www~)
// express.json()과 함께 사용
// title=타이틀&name=이름 형식 데이터를 urlencoded 미들웨어가 객체로 변경해서 req.body에 추가 함
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.json(posts);  // 게시글 리스트를 json형식으로 보여줌
});

app.post("/posts", (req, res)=>{
  const {title, name, text} = req.body;

  posts.push({id: posts.length + 1, title, name, text, createdDt: Date()});

  // res.end()함수의 인수로는 문자열과 바이트 버퍼 형식만 넣을 수잇다
  // res.json()함수는 리스트와 json데이터를 처리 가능
  res.json({title, name, text});
});

app.delete("/posts/:id", (req, res)=>{
  const id = req.params.id;
  
  const filteredPosts = posts.filter((post) => post.id !== +id);  // 글 삭제 로직
  const isLengthChanged = posts.length !== filteredPosts.length;  // 삭제 확인
  
  posts = filteredPosts;
  if(isLengthChanged){
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED")
});

app.listen(3000, () => {
  console.log("welcome posts START!");
})



