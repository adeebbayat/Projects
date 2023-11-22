import FullCalendar from "./components/calendar/FullCalendar"
import TotalToDoList from "./components/toDoList/TotalToDoList"

const App = () => {



  return(
    <div className="flex justify-center mt-10 gap-16">
      <TotalToDoList/>
      <FullCalendar/>
    </div>
  )
}

export default App
