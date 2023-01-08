import React,{useState} from "react";
import post from "axios";

function CustomerAdd(props){
    const [file,setFile]=useState(null);
    const [userName,setUserName]=useState('');
    const [birthday,setBirthday]=useState('');
    const [gender,setGender]=useState('');
    const [job,setJob]=useState('');
    const [fileName,setFileName]=useState('');
    
    const handleFormSubmit=(event)=>{
        event.preventDefaut();
        addCustomer()
            .then((res)=>{console.log(res.data)});
    }

    const addCustomer=()=>{
        const url="/api/customers";
        const formData=new FormData();
        formData.append('image',file);
        formData.append('name',userName);
        formData.append('birthday',birthday);
        formData.append('gender',gender);
        formData.append('job',job);
        const config={
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        return post(url,formData,config);
    }
    
    const handleFileChange=(e)=>{
        setFile(e.target.files[0]);
        setFileName(e.target.value.fileName);
    }

    const handleValueChange=(e)=>{
        setUserName(e.target.value.userName);
        setBirthday(e.target.value.birthday);
        setGender(e.target.value.gender);
        setJob(e.target.value.job);
    }
    return(
        <form onSubmit={handleFormSubmit}>
            <h1>고객추가</h1>
            프로필 이미지: <input type="file" name="file" file={file} value={fileName} onChange={handleFileChange}/><br/>
            이름: <input type="text" name="username" value={userName} onChange={handleValueChange}/><br/>
            생년월일: <input type="text" name="birthday" value={birthday} onChange={handleValueChange}/><br/>
            성별: <input type="text" name="gender" value={gender} onChange={handleValueChange}/><br/>
            직업: <input type="text" name="job" value={job} onChange={handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form> 
    );
}

export default CustomerAdd;