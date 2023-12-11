import Calendar from "./Calendar"
import {useState} from "react";
import {format} from "date-fns";

const FullCalendar = () => {
  const [currentDate,setCurrentDate] = useState(new Date());

  const handleSetToday = () => setCurrentDate(new Date());


  return(
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="select-none"><span className="font-bold">Selected Date:</span> {format(currentDate,'LLLL dd yyyy')}</p>
        <button onClick = {handleSetToday} className = "select-none px-4 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800">Today</button>
      </div>

      <Calendar value = {currentDate} onChange = {setCurrentDate}/>
    </div>
  )
}

export default FullCalendar