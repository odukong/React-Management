import React,{useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//import {Link,Outlet} from "react-router-dom";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from '@mui/material/Container';
import Axios from "axios";

function SignUp(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [id,setId]=useState("");
    const [passwd,setPasswd]=useState("");
    const [IsEmail,setIsEmail]=useState(false);
    const [IsId,setIsId]=useState(false);
    const [IsPasswd,setIsPasswd]=useState(false);

    const handleJoin=(e)=>{
        e.preventDefault();
        //체크할 함수들
        checkEmail();checkId();checkPw();
        if(IsEmail&&IsId&&IsPasswd){
            //정상적으로 회원가입되었을 때
            sendBackend();
            setName('');setEmail('');setId('');setPasswd('');
            window.location.href='/';    
        }else{
            //회원가입 실패했을 때  
            setName('');setEmail('');setId('');setPasswd('');  
        }
    }
    
    const sendBackend=()=>{
            Axios.post('/join',{
                name:{name},
                email:{email},
                id:{id},
                passwd:{passwd}
            })
            .then((res)=>{
                console.log(`서버에서 받아온 입력 데이터 ${res}`);
                console.log(res.data);
            })
            .catch((err)=>console.log(err));    
    }

    const checkEmail=()=>{
        const emailRegex =/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if(!emailRegex.test(email)){
            console.log("이메일 형식 오류")
            setIsEmail(false)    
        }else{
            console.log("올바른 이메일 형식")
            setIsEmail(true)
        }
    }
    const checkId=()=>{
        const idRegex=/^[a-zA-Z][0-9a-zA-Z]{4,20}$/; //대소문자+숫자
        if(!idRegex.test(id)){
            console.log("아이디 형식 오류")
            setIsId(false)
        }else{
            const config={
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const data={
                id:`${id}`
            }
            Axios.post("http://localhost:5000/check",data,config)
            .then(res=>console.log(res))
            .then(json=>{
                if(json.tf===true){
                    console.log("올바른 아이디 형식, 사용가능한 아이디")
                    setIsId(true)        
                }else{
                    console.log("중복된 아이디")
                    setIsId(false)
                }
            })
        }
    }
    const checkPw=()=>{
        //숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
        const pwdRegex=/(?=.*\d{1,20})(?=.*[~`!@#$%\^&*()-+=]{1,20})(?=.*[a-zA-Z]{2,20}).{8,20}$/;
        if(!pwdRegex.test(passwd)){
            console.log("비밀번호 형식 오류")
            setIsPasswd(false)
        }else{
            console.log("올바른 비밀번호 형식")
            setIsPasswd(true)
        }
    }
    const handleName=(e)=>{e.preventDefault();setName(e.target.value);}
    const handleEmail=(e)=>{e.preventDefault();setEmail(e.target.value);}
    const handleId=(e)=>{e.preventDefault();setId(e.target.value);}
    const handlePasswd=(e)=>{e.preventDefault();setPasswd(e.target.value);}

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop:30,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Box sx={{margin:5}}><LockOutlinedIcon/></Box>
                <Typography component="h1" variant="h5">회원가입</Typography>
                <Box component="form" onSubmit={handleJoin} noValidate sx={{mt:3}} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name="name" required fullWidth value={name} onChange={handleName} label="name" autoFocus/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="email" required fullWidth value={email} onChange={handleEmail} label="email" autoFocus/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="id" required fullWidth value={id} onChange={handleId} label="id" autoFocus/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" name="passwd" required fullWidth value={passwd} onChange={handlePasswd} label="passwd" autoFocus/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <Button variant="outlined" href="/" sx={{ ml:2,mt: 3, mb: 2, paddingLeft:6,paddingRight:6}}>
                                BACK
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, paddingLeft:6,paddingRight:6}}>
                                회원가입
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp;