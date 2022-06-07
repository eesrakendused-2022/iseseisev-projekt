import React from 'react'   
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";
import etLocale from '@fullcalendar/core/locales/et';


const events = [{ title: "Täna", date: new Date() }];  

export class Calendar extends React.Component {  
    render() {  
        return (  
            <div className="mainContainer">  
                <div className="navigationCalendar" style={{ marginTop: "20px" }} >  
                </div>  
                <FullCalendar  
                    defaultView="dayGridMonth"  
                    plugins={[dayGridPlugin]}  
                    events={events}
                    locale={etLocale}  
                />  
            </div>  
        )  
    }  
}  
  
export default Calendar;