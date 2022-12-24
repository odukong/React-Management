import './App.css';
import Customer from './Customer';

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

function App() {
  return(
    customers.map((customer)=>{
      return (
        <div>
          <Customer
            key={customer.id}
            image={customer.image}
            name={customer.name}
            birthday={customer.birthday}
            gender={customer.gender}
            job={customer.job}/>
        </div>
      )
    })
  )
}

export default App;
