import Calendar from "./calendar/Calendar"
import {useState} from "react";
const App = () => {
  const [currentDate,setCurrentDate] = useState(new Date());

  return(
    <div className="mt-16 flex flex-col items-center">
      <Calendar value = {currentDate} onChange = {setCurrentDate}/>
    </div>
  )
}

export default App
