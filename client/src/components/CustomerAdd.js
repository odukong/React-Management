import React,{useState} from "react";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";


const styles=theme=>({
    hidden:{
        display:'none'
    }
})

function CustomerAdd(props){
    const [file,setFile]=useState(null);
    const [userName,setUserName]=useState('');
    const [birthday,setBirthday]=useState('');
    const [gender,setGender]=useState('');
    const [job,setJob]=useState('');
    const [fileName,setFileName]=useState('');
    const [open,setOpen]=useState(false);

    const handleFile=(e)=>{
        setFile(e.target.files[0]);
        setFileName(e.target.value);
    }
    const handleName=(e)=>{
        e.preventDefault();
        setUserName(e.target.value);
    }
    const handleBirthday=(e)=>{
        e.preventDefault();
        setBirthday(e.target.value);
    }
    const handleGender=(e)=>{
        e.preventDefault();
        setGender(e.target.value);
    }
    const handleJob=(e)=>{
        e.preventDefault();
        setJob(e.target.value);
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        addCustomer()
            .then((res)=>{
                console.log(res);
                props.stateRefresh();
            });
        setFile(null);setUserName('');setBirthday('');
        setGender('');setJob('');setFileName('');
        setOpen(false);
        //window.location.reload();
    }

    const addCustomer=()=>{
        const url="http://localhost:5000/api/customers";
        const formData=new FormData();
        formData.append('image',file);
        formData.append('name',userName);
        formData.append('birthday',birthday);
        formData.append('gender',gender);
        formData.append('job',job);
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        return Axios.post(url,formData,config);
    }
    
    const handleClickOpen=()=>{
        setOpen(true);
    }
    const handleClickClose=()=>{
        setFile(null);setUserName('');setBirthday('');
        setGender('');setJob('');setFileName('');
        setOpen(false);
    }
    const {classes}=props;
    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                고객 추가하기
            </Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={file} value={fileName} onChange={handleFile}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {fileName===""? "프로필 이미지 선택":fileName}
                        </Button>
                    </label><br/>
                    <TextField label="이름" type="text" name="userName" value={userName} onChange={handleName}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={birthday} onChange={handleBirthday}/><br/>
                    <TextField label="성별" type="text" name="gender" value={gender} onChange={handleGender}/><br/>
                    <TextField label="직업" type="text" name="job" value={job} onChange={handleJob}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                        추가
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleClickClose}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(CustomerAdd);