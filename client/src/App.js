


import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer , View} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addEvent, getDatafromLS } from "./localStorage";
const localizer = momentLocalizer(moment)
function App() {

  const[newEvent, setNewEvent] = useState({ title :"" , start:"", end:"" })
     const[allEvents, setAllEvents] = useState([])
   
  
   //  console.log(allEvents)


 /// gwt event in our local torage
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
    // store in local storage 
    addEvent({...newEvent})
    window.location.reload()

    console.log(newEvent)
     }

   const Event=  allEvents.map((event)=>{
      //new date (y m d h m)
      return{
        title:event.title,
        start:new Date(event.start),
        end: new Date(event.end)
      }
     })
     console.log(Event)
    
  return (
    <div className="App">
   <div className="container">
   <div className="row">
   <div className="col-md-4">
   <h3 className="mt-5">Add Period</h3>
     <div className="mt-5 mb-5">
                <input type="text" placeholder="Add Title"  className=" my-3 w-100"  value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                <input type="datetime-local" placeholder="start date" className="mt-2 my-3 w-100" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} required/>
                <input type="datetime-local" placeholder="end date" className="mt-2 my-3 w-100"alue={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} required/>
                <button className="mt-2" onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            </div>
            
  


    <div className="col-md-8">
    <div className="mt-5 mb-5">
              <Calendar
                       localizer={localizer}
                      events={Event}
                      startAccessor={"start"}
                      endAccessor={"end"}
                      style={{ height: 500 }}
                  />
                  </div>
          </div>
          </div>
          </div>
          </div>
         
  );
}

export default App;

