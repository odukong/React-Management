import './App.css';
import Customer from './Customer';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';

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

const customers=[{
  'id':1,
  'name':'홍길동',
  'image':'https://placeimg.com/64/64/1',
  'birthday':'961222',
  'gender':'남자',
  'job':'대학생'
},
{
  'id':2,
  'name':'오수빈',
  'image':'https://placeimg.com/64/64/2',
  'birthday':'021017',
  'gender':'여자',
  'job':'대학생'
},
{
  'id':3,
  'name':'짜증나',
  'image':'https://placeimg.com/64/64/3',
  'birthday':'901222',
  'gender':'남자',
  'job':'회사원'
}]

function App(props) {
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
                {customers.map((customer)=>{
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
                })}
            </TableBody>
          </Table>
        </Paper>
      );
}

export default withStyles(styles)(App);
