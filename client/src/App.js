import './App.css';
import Customer from './Customer';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';
import { useEffect,useState } from 'react';

const styles=(theme)=>({
  root:{
    width:'100%',
    marginTop:theme.spacing.unit*3,
    overflow:"auto"
  },
  table:{
    minWidth:1080
  }
})

const serverURL="http://localhost:5000/api/customers";

function App(props) {
      const [customerData,setCustomerData]=useState(null);
      
      useEffect(()=>{
        fetch(serverURL)
        .then(res=>res.json())
        .then(data=>setCustomerData(data))
        .catch(err=>console.log(err));
      },[])

      const {classes}=props;
      return (
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
                {(customerData)===null ? "" :(
                  customerData.map((customer)=>{
                    return(
                        <Customer
                            key={customer.id}
                            id={customer.id}
                            image={customer.image}
                            name={customer.name}
                            birthday={customer.birthday}
                            gender={customer.gender}
                            job={customer.job}/>
                    )
                  })
                )}
                
            </TableBody>
          </Table>
        </Paper>
      );
}

export default withStyles(styles)(App);
