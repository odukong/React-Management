import React,{useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Link,Outlet,useNavigate} from "react-router-dom";
//import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Axios from "axios";
import './Greeting.css';

const URL="http://localhost:5000/login";

function Greeting(){
    const [id,setId]=useState("");
    const [passwd,setPasswd]=useState("");
    const [isMatched,setIsMatched]=useState(true);

    const navigater=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        checkUser()
        .then((res)=>{
            console.log(res.data);
            return res.data;})
        .then((res)=>{
            if(res){
                setIsMatched(true);
                //로그인 성공시 이동
                console.log("=========로그인 성공")
                navigater('/home/'+id);
            }else{
                setIsMatched(false);
                console.log("=========로그인 실패");
            }
        })
        
    }

    const checkUser=()=>{
        console.log(id);
        const formData=new FormData();
        formData.append('id',id);
        formData.append('passwd',passwd);
        const config={
            headers:{
                'Content-Type':`application/json`
            }
        }
        console.log(formData.get('id'))
        console.log(formData.get('passwd'))
        return Axios.post(URL,formData,config);
    }
    const alertText=()=>{
        return isMatched===true? 'matchstyle' : 'mismatchstyle';
    }

    const handleID=(e)=>{e.preventDefault();setId(e.target.value);}
    const handlePWD=(e)=>{e.preventDefault();setPasswd(e.target.value)}

    return(  
        <Box sx={{marginTop:30,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Box sx={{margin:5}}><LockOutlinedIcon/></Box>
            <Typography component="h1" variant="h5">로그인</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:2}}>
                <TextField margin="normal" fullWidth required label="아이디" name="id" value={id} onChange={handleID} autoFocus/>
                <TextField margin="normal" fullWidth required label="비밀번호" type="password" name="passwd" onChange={handlePWD} value={passwd}/>
                <div className={alertText()}>입력 정보를 확인해주세요</div>
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt:3,mb:2}}>로그인</Button>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Link to="join">회원가입</Link>
                        <Outlet/>
                    </Grid>
                </Grid>
            </Box>
        </Box> 
    )
}

export default Greeting;