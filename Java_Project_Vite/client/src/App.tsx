import FullCalendar from "./components/calendar/FullCalendar"
import TopBar from "./components/topBar/TopBar"
import {useState} from 'react';
import ToDoList from './components/toDoList/ToDoList';
import ToDoForm from './components/toDoList/ToDoForm';


const App = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const refreshPage = () => {
      setRefresh(!refresh);
  };


  return(
    <>
    <div className="flex justify-center border-b-4 border-b-black p-10">
      <TopBar/>
    </div>
    <div className="flex justify-center mt-10 gap-16">
      <div className='addToDo'>
          <h2>Add a task</h2>
          <ToDoForm refreshPage={refreshPage} />
      </div>
      <FullCalendar/>
      <div className='body'>
          <ToDoList refresh={refresh} />
      </div>
    </div>
    </>
  )
}

export default App


