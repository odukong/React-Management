const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql');
const port = process.env.PORT||5000;
const app=express();

const connection=mysql.createConnection({
    user:'root',
    password:'DBAsubin2030515!',
    host:'localhost',
    database:'userlogin'
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/check',(req,res)=>{
    console.log(req.body);
    var data=req.body.id;
    let sql="SELECT COUNT(*) AS result FROM user WHERE id=?";
    console.log(data);
    connection.query(sql,data,(err,rows,fields)=>{
        //let checkid=new Object();
        //data=JSON.parse(data);
        console.log(rows[0])
        if(!err){
            if(rows[0].result===0){
                console.log(`사용가능한 아이디`);
                return res.send(JSON.parse(JSON.stringify(true)));
            }else{
                console.log("중복된 아이디");
                return res.send(JSON.parse(JSON.stringify(false)));
            }
        }else{
            console.log("체크중 에러발생");
            return res.send(JSON.parse(JSON.stringify(false)))
        }
    })
})
app.post('/join',(req,res)=>{
    console.log(req.body);
    var data=[req.body.id,req.body.passwd,req.body.name,req.body.email];
    console.log("서버에서 회원가입할 데이터를 받았습니다");
    
    let sql="INSERT INTO user(id,pw,name,email) values(?,?,?,?)";
    connection.query(sql,data,(err,rows)=>{
        if(err){console.log(err);return;}
        return res.send(JSON.parse(JSON.stringify(rows)));
    })
})

app.post('/login',(req,res)=>{
    let sql="SELECT COUNT(*) AS result FROM user WHERE id=?";
    console.log(req.body);
    let id=req.body.id;
    let passwd=req.body.passwd;
    
    connection.query(sql,id,(err,rows,fields)=>{
        if(!err){
            //동일한 id가 존재하지 않는다면
            if(rows[0].result<1){
                console.log("존재하지 않는 아이디");
                return res.send(JSON.parse(JSON.stringify(false)))
            }else{//동일한 id가 존재한다면 비밀번호 일치 확인
                let sql2=`SELECT 
                            CASE (SELECT COUNT(*) FROM user WHERE id = ? AND pw = ?)
                                WHEN '0' THEN NULL
                                ELSE (SELECT id FROM user WHERE id = ? AND pw = ?)
                            END AS userId
                            , CASE (SELECT COUNT(*) FROM user WHERE id = ? AND pw = ?)
                                WHEN '0' THEN NULL
                                ELSE (SELECT pw FROM user WHERE id = ? AND pw = ?)
                            END AS userPw`;
                let params=[id,passwd,id,passwd,id,passwd,id,passwd];
                connection.query(sql2,params,(err,rows,fields)=>{
                    console.log(rows);
                    if(rows[0].userId!==null&&rows[0].userPw!==null){
                        return res.send(JSON.parse(JSON.stringify(true)))
                    }else{
                        console.log("비밀번호가 일치하지 않습니다")
                        return res.send(JSON.parse(JSON.stringify(false)))
                    }
                })
            }
        }else{
            console.log("에러")
        }
    })
})

app.get("/home/:id",(res,req)=>{

})
app.listen(port,()=>{console.log(`Listening on port ${port}`)});

