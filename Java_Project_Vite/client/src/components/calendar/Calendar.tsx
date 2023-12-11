import axios from "axios";
import { add, differenceInCalendarDays, endOfMonth, format, set, setDate, startOfMonth, sub } from "date-fns";
import { useEffect, useState } from "react";
import Cell from "./Cell";

const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

interface Props{
    value?: Date;
    onChange?: (value: Date) => void;
    
}

const Calendar: React.FC<Props> = ({value = new Date(), onChange}) => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [dates,setDates] = useState<Date[]>([]);
    const [tasks, setTasks] = useState<{ title: string, body: string, date: Date }[]>([]);
    const [showDateInfo, setShowDateInfo] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<{ title: string, body: string }[]>([]);
    const [rerender, setRerender] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8080/api/todos')
            .then(res => {
                setTitle(res.data[2]);
                setBody(res.data[1]);
                const newDates = res.data[3].map((item: any) => new Date(item));
                const newDates2 = newDates.map((item:any) => add(item,{days:1}))
                setDates(newDates2);
                const newTitles = res.data[2].map((item: any, index: any) => ({ title: item }));
                const newBodies = res.data[1].map((item: any, index: any) => ({ body: item }));
                const newTasks = newTitles.map((item: any, index: any) => ({ ...item, ...newBodies[index], date: newDates[index] }));
                setTasks(newTasks);
                setRerender(true);
            })
            .catch(err => console.log(err));
    }, [rerender]);

    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInCalendarDays(endDate,startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => onChange && onChange(sub(value,{months : 1}));
    const nextMonth = () => onChange && onChange(add(value,{months : 1}));
    
    const prevYear = () => onChange && onChange(sub(value,{years : 1}));
    const nextYear = () => onChange && onChange(add(value,{years : 1}));

    
    const handleClickDate = (index: number) => {
        const date = setDate(value, index);
        onChange && onChange(date);
        const selectedTasks = tasks.filter(task => task.date.getDate() + 1 === date.getDate() && task.date.getMonth() === date.getMonth() && task.date.getFullYear() === date.getFullYear());
        setSelectedTasks(selectedTasks);
        setShowDateInfo(selectedTasks.length > 0);
    };
    

    return(
        <>
        <div className = "w-[400px] border-t border-l">
            <div className="grid grid-cols-7 items-center justify-center">
                <Cell onClick = {prevYear}>{"<<"}</Cell>
                <Cell onClick = {prevMonth}>{"<"}</Cell>
                <Cell className="col-span-3">{format(value,'LLLL yyyy')}</Cell>
                <Cell onClick = {nextMonth}>{">"}</Cell>
                <Cell onClick = {nextYear}>{">>"}</Cell>

                {daysOfWeek.map((day) => (
                    <Cell key = {day} className="text-sm font-bold">{day}</Cell>
                    ))}
                    
                {Array.from({ length: prefixDays }).map((_, index) => (
                        <Cell key={index}></Cell>
                    ))}

                {rerender && Array.from({length: numDays}).map((_,index) =>{
                    const date = index + 1;
                    const isCurrentDate = date === value.getDate();
                    const containsTask = dates.some((d) => d.getDate() === date && d.getMonth() === value.getMonth() && d.getFullYear() === value.getFullYear());
                    return <Cell containsTask={containsTask} isActive={isCurrentDate} onClick={() => handleClickDate(date)} key={date}>{date}</Cell>
                })}
                
                {Array.from({length:suffixDays}).map((_,index)=>(
                    <Cell key={index}></Cell>
                ))}
            </div>
        </div>
        {showDateInfo && (
            <div>
                {selectedTasks.map((task, index) => (
                    <div className = "w-[400px]" key={index}>
                        <h5>{index+1}) {task.title}</h5>
                    </div>
                ))}
            </div>
        )}
        </>
    )
}

export default Calendar;