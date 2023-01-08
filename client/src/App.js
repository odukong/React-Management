import './App.css';
import Customer from './components/Customer';
import CustomerAdd from "./components/CustomerAdd";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';
import { useEffect,useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles=(theme)=>({
  root:{
    width:'100%',
    marginTop:theme.spacing.unit*3,
    overflow:"auto"
  },
  table:{
    minWidth:1080
  },
  progress:{
    margin:theme.spacing.unit*2
  }
})

const serverURL="http://localhost:5000/api/customers";

function App(props) {
      const [customerData,setCustomerData]=useState(null);
      const [completed,setCompleted]=useState(0);
      const [isLoad,setIsLoad]=useState(false);

      useEffect(()=>{
        const timer=setInterval(()=>{
          setCompleted((completed)=>completed>=100?0:completed+1);
          if(isLoad){clearInterval(timer);}
        },20);

        callApi()
        .then(data=>setCustomerData(data))
        .catch(err=>console.log(err));
      },[isLoad]);

      const callApi=async()=>{
        const response=await fetch(serverURL);
        const body=await response.json();
        setIsLoad(true);
        return body;
      }

      const {classes}=props;
      return (
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>생년월일</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>직업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {(customerData)===null ? 
                    <TableRow>
                      <TableCell colspan="6" align="center">
                        <CircularProgress className={classes.progress} variant="indeterminate" value={completed}/>
                      </TableCell>
                    </TableRow> 
                    :(
                      customerData.map((customer)=>{
                        return(
                          <Customer
                              key={customer.ID}
                              id={customer.ID}
                              image={customer.IMAGE}
                              name={customer.NAME}
                              birthday={customer.BIRTHDAY}
                              gender={customer.GENDER}
                              job={customer.JOB}/>
                      )
                    })
                  )}
              </TableBody>
            </Table>
          </Paper>
          <CustomerAdd/>
        </div>
      );
}

export default withStyles(styles)(App);
