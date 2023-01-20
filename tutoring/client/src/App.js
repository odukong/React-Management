import './App.css';
import Greeting from './components/Greeting';
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/home" element={<Main/>}/>
        <Route path="/" element={<Greeting/>}/>
        <Route path="/join" element={<SignUp/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
