import './components.css';

function DateCard({date,prevDate,nextDate}:{date:string,prevDate:()=>void,nextDate:()=>void}){
  const symobls = ["<",">"];
  return(
    <div className="date-container">
      <div onClick={prevDate} className='date-container-date'>
        {symobls[0]}
      </div>
      <div className='date-container-date'>{date}</div>
      <div onClick={nextDate} className='date-container-date'>
        {symobls[1]}
      </div>
    </div>
  )
}
export default DateCard;
