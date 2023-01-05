const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const port = process.env.PORT||5000;
const oracledb=require('oracledb');

oracledb.autoCommit=true;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    oracledb.getConnection({
        user:'MANAGER',
        password:'manager',
        host:'localhost',
        database:'management'
    },function(err,conn){
        if(err){
            console.log('접속실패',err);
            return;
        }
        console.log('접속성공');
        
        let query='select *'+' from CUSTOMER';
        conn.execute(query,[],{outFormat:oracledb.OBJECT},
            function(err,result){
                if(err) {console.log("조회실패");return;};
                console.log('query read success');
                console.log(result.rows);
                res.send(result.rows);

                doRelease(conn,result.rows);
            }
        )
    });

    function doRelease(conn,userlist){
        conn.close(function(err){
            if(err){
                console.error(err.message);
            }

            for(var i=0;i<userlist.length;i++){
                console.log("name "+userlist[i][i]);
            }
        })
    }
});

app.listen(port,()=>{console.log(`Listening on port ${port}`)});
