const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const port = process.env.PORT||5000;
const mysql=require('mysql');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection=mysql.createConnection({
    user:'root',
    password:'DBAsubin2030515!',
    host:'localhost',
    database:'management'
});

connection.connect((err)=>{
    if(err){
        console.log('접속실패',err);
        return;
    }
    console.log('접속성공');
});

const multer=require('multer');
const upload=multer({dest:'./upload'});

app.get('/api/customers',(req,res)=>{
    let query='select *'+' from customer';
        connection.query(query,[],
            function(err,rows,fields){
                if(err) {console.log("조회실패");return;};
                console.log('query read success');
                res.send(rows);
            }
        )
})

app.use('/image',express.static('./upload'));

app.post('/api/customers',upload.single('image'),(req,res)=>{
    let sql="INSERT INTO customer VALUES (null,?,?,?,?,?)";
    let image='/image'+req.file.filename;
    let name=req.body.name;
    let birthday=req.body.birthday;
    let gender=req.body.gender;
    let job=req.body.job;
    
    let params=[image,name,birthday,gender,job];
    connection.query(sql,params,(err,rows,fields)=>{
        res.send(rows);
        console.log(err);
        console.log(rows);
    })
});

app.listen(port,()=>{console.log(`Listening on port ${port}`)});
