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
    connection.query(sql,[data],(err,rows,fields)=>{
        let checkid=new Object();
        checkid.tf=false;

        if(!err){
            if(rows[0].result===0){
                checkid.tf=true;
                res.send(checkid);
                console.log(`첫번째 이프문 사용가능`);
            }else{
                checkid.tf=false;
                res.send(checkid);
                console.log("첫번째 엘스문 중복임")
            }
        }else{
            res.send(err);
            console.log("체크중 에러발생");
        }
    })
})
app.post('/join',(req,res)=>{
    console.log(req.body);
    var data=[req.body.name,req.body.email,req.body.id,req.body.passwd];
    console.log(`서버에서 받은 데이터 :${data}`);
    
    let sql="INSERT INTO user(id,pwd,name,email) values(?,?,?,?)";
    connection.query(sql,data,(err,rows)=>{
        if(err){console.log(err);}
        res.send(rows);
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
                res.send(err)
                console.log("존재하지 않는 아이디")
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
                    if(!err){
                        res.send(rows)
                    }else{
                        res.send(err)
                        console.log("비밀번호가 일치하지 않습니다")
                    }
                })
            }
        }else{
            res.send(err);
            console.log("에러")
            console.log(id);
        }
    })
})


app.listen(port,()=>{console.log(`Listening on port ${port}`)});

