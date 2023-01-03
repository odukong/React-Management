const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const port = process.env.PORT||5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.json(
        [{
            'id':1,
            'name':'홍길동',
            'image':'https://placeimg.com/64/64/1',
            'birthday':'961222',
            'gender':'남자',
            'job':'대학생'
        },
        {
            'id':2,
            'name':'오수빈',
            'image':'https://placeimg.com/64/64/2',
            'birthday':'021017',
            'gender':'여자',
            'job':'대학생'
        },
        {
            'id':3,
            'name':'짜증나',
            'image':'https://placeimg.com/64/64/3',
            'birthday':'901222',
            'gender':'남자',
            'job':'회사원'
        }]
    )
})

app.listen(port,()=>{console.log(`Listening on port ${port}`)});
