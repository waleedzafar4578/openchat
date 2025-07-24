import './components.css';
import React from 'react';
function DateCard({date}:{date:string}){
  return(
    <div className="date-container">
      <div className='date-container-date'>{date}</div>
    </div>
  )
}
export default DateCard;
