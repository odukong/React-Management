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
import CircularisLoad from '@material-ui/core/CircularProgress';

const styles=(theme)=>({
  root:{
    width:'100%',
    marginTop:theme.spacing(3),
    overflow:"auto"
  },
  table:{
    minWidth:1080
  },
  isLoad:{
    margin:theme.spacing(2)
  }
})

const serverURL="http://localhost:5000/api/customers";

function App(props) {
      const [customerData,setCustomerData]=useState([]);
      //const [completed,setCompleted]=useState(0);
      const [isLoad,setIsLoad]=useState(0);

      const callApi=()=>{
        fetch(serverURL)
          .then((res)=>res.json())
          .then((body)=>{
            setCustomerData(body);
          })
      }
      useEffect(()=>{
        callApi()
      },[]);

      const stateRefresh=()=>{
        setCustomerData([])
        fetch(serverURL)
          .then((res)=>res.json())
          .then((body)=>{
            setCustomerData(body)
          })
      }

      useEffect(()=>{
        const timer=setInterval(()=>{
          setIsLoad(isLoad=>isLoad>=100?0:isLoad+1);
        },200)
        return ()=>{
          clearInterval(timer);
        }
      },[])

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
                  <TableCell>설정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {(customerData)===null ? 
                    <TableRow>
                      <TableCell colSpan="7" align="center">
                        <CircularisLoad className={isLoad} variant="determinate" value={isLoad}/>
                      </TableCell>
                    </TableRow> 
                    :(
                      customerData.map((customer)=>{
                        return(
                            <Customer
                                stateRefresh={stateRefresh}
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
          <CustomerAdd stateRefresh={stateRefresh}/>
        </div>
      );
}

export default withStyles(styles)(App);
