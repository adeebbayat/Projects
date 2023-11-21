import logo from './logo.svg';
import './App.css';
import Main from './views/Main'
import {Routes,Route,Link,Navigate} from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element = {<Main/>}/>
    </Routes>

  );
}

export default App;
