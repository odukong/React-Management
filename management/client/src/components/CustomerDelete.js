import React,{useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function CustomerDelete(props){
    const [open,setOpen]=useState(false);

    const deleteCustomer=(id)=>{
        const url='http://localhost:5000/api/customers/'+id;
        console.log(props);
        fetch(url,{
            method:'DELETE',
        })
        props.stateRefresh();
    }

    const handleClickOpen=()=>{
        setOpen(true);
    }
    const handleClickClose=()=>{
        setOpen(false);
    }

    return(
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                삭제
            </Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle onClose={handleClickClose}>삭제 경고</DialogTitle>
                <DialogContent>
                    <Typography guttorBottom>
                        선택한 고객 정보가 삭제됩니다. 
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e)=>deleteCustomer(props.id)}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={handleClickClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
        //<button onClick={(e)=>deleteCustomer(props.id)}>삭제</button>
    )
}

export default CustomerDelete;