import './App.css';
import './index.css'
import Customer from './components/Customer.js';
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

import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const styles=(theme)=>({
  root:{
    width:'100%',
    minWidth:1080
  },
  paper:{
    marginLeft:18,
    marginRight:18,
  },
  tableHead:{
    fontSize:'1.0rem'
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center'
  },
  isLoad:{
    margin:theme.spacing(2)
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const serverURL="http://localhost:5000/api/customers";

function App(props) {
      const [customerData,setCustomerData]=useState([]);
      //const [completed,setCompleted]=useState(0);
      const [isLoad,setIsLoad]=useState(0);
      const [searchKeyword,setSearchKeyword]=useState('');

      const callApi=()=>{
        fetch(serverURL)
          .then((res)=>res.json())
          .then((body)=>{
            setCustomerData(body);
            console.log(body);
          })
      }
      useEffect(()=>{
        callApi()
      },[]);

      const stateRefresh=()=>{
        setCustomerData([]);
        setIsLoad(0);
        setSearchKeyword("");
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

      const handleValueChange=(e)=>{
        setSearchKeyword(e.target.value);
      }

      const filterComponent=(data)=>{
        data=data.filter((c)=>{
          if(searchKeyword===""){return c}
          else if(c.NAME.includes(searchKeyword)){return c}
        });
        return(
          data.map((c)=>{
            return(
              <Customer stateRefresh={stateRefresh} key={c.ID} id={c.ID} image={c.IMAGE}
                  name={c.NAME} birthday={c.BIRTHDAY} gender={c.GENDER} job={c.JOB}/>
            )
        }));
      }
      const {classes}=props;
      const cellList=["번호","이미지","이름","생년월일","성별","직업","설정"];
      return (
        <div className={classes.root}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  고객 관리 시스템
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="검색하기"
                    inputProps={{ 'aria-label': 'search' }}
                    name="searchKeyword"
                    onChange={(e)=>handleValueChange(e)}
                    value={searchKeyword}
                  />
                </Search>
              </Toolbar>
            </AppBar>
          </Box>
          <div className={classes.menu}>
            <CustomerAdd stateRefresh={stateRefresh}/>
          </div>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map((i)=>{
                    return(
                      <TableCell className={classes.tableHead}>
                        {i}
                      </TableCell>
                      );
                    })}
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
                      filterComponent(customerData)
                  )}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
}

export default withStyles(styles)(App);
