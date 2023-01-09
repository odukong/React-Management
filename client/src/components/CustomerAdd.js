import React,{useState} from "react";
import Axios from "axios";

function CustomerAdd(props){
    const [file,setFile]=useState(null);
    const [userName,setUserName]=useState('');
    const [birthday,setBirthday]=useState('');
    const [gender,setGender]=useState('');
    const [job,setJob]=useState('');
    const [fileName,setFileName]=useState('');
    
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
    
    return(
        <form onSubmit={handleFormSubmit}>
                <h1>고객추가</h1>
                프로필 이미지: <input type="file" name="file" file={file} value={fileName} onChange={handleFile}/><br/>
                이름: <input type="text" name="userName" value={userName} onChange={handleName}/><br/>
                생년월일: <input type="text" name="birthday" value={birthday} onChange={handleBirthday}/><br/>
                성별: <input type="text" name="gender" value={gender} onChange={handleGender}/><br/>
                직업: <input type="text" name="job" value={job} onChange={handleJob}/><br/>
                <button type="submit">추가하기</button>
        </form>
    );
}

export default CustomerAdd;