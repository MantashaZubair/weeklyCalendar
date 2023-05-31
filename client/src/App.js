

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEvent, getDatafromLS } from "./localStorage";



const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



export const myresources = [
	{ id: 1, title: "sun" },
	{ id: 2, title: "mon" },
	{ id: 3, title: "tues" },
	{ id: 4, title: "wed" },
	{ id: 5, title: "thurs" },
	{ id: 6, title: "Fri" },
	{ id: 7, title: "sat" },

];

function App() {

  
  const[newEvent, setNewEvent] = useState({ title :"" , start:"", end:"" })
     const[allEvents, setAllEvents] = useState([])
     const[defaultDate , setDefaultDate]=useState(new Date())
     
     function filterDate(date, hour){
      setDefaultDate(new Date(date + 'T' +hour))
     }
    //  console.log(allEvents)

    useEffect (()=>{
      setAllEvents(getDatafromLS())
    },[])

     function handleAddEvent(e){
      e.preventDefault()
      for (let i=0; i<allEvents.length; i++){

        const d1 = new Date (allEvents[i].start);
        const d2 = new Date(newEvent.start);
        const d3 = new Date(allEvents[i].end);
        const d4 = new Date(newEvent.end);
  // /*
  //     console.log(d1 <= d2);
  //     console.log(d2 <= d3);
  //     console.log(d1 <= d4);
  //     console.log(d4 <= d3);
  //       */

         if (
          ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
            (d4 <= d3) )
          )
        {   
            alert("CLASH"); 
            break;
         }

   }
    
    
    // setAllEvents([...allEvents, newEvent]);
    addEvent({...newEvent})
    window.location.reload()
    // localStorage.setItem('allEvents',JSON.stringify(newEvent))
    console.log(newEvent)
     }


    
 
  return (
    <div className="App">
   <div className="container">
   <div className="row">
   <div className="col-md-4">
   <h3>Add Period</h3>
     <div className="mt-5 mb-5">
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} timeFormat="HH:mm" dateFormat="MMMM d ,yyyy h:mm am"  showTimeSelect selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} timeFormat="HH:mm" dateFormat="MMMM d ,yyyy h:mm am"  showTimeSelect onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            </div>
            
  


    <div className="col-md-8">
    <div className="mt-5 mb-5">
              <Calendar
                      events={allEvents}
                      resources={myresources}
                      localizer={localizer}
                      defaultView="month"
                       defaultDate={defaultDate}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 700 }}
                  />
                  </div>
          </div>
          </div>
          </div>
          </div>
         
  );
}

export default App;



