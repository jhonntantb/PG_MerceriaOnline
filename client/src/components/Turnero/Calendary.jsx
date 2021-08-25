import React, { useState } from 'react';
import DatePicker from 'react-date-picker';


function Calendary({selectedDate,setSelectedDate}) {
    console.log("el dia selecccionado",selectedDate)
    return (
        <div>
        <div>
           <DatePicker
           selected={selectedDate}
           value={selectedDate}
           onChange={date=>setSelectedDate(date)}
           minDate={new Date()}
           tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0 || date.getDay() === 6 }
           isOpen={true}
            /> 
        </div>
        </div>
    )
}

export default Calendary
