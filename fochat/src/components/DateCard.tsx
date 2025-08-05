import './components.css';

function DateCard({ date, prevDate, nextDate }: { date: string, prevDate: () => void, nextDate: () => void }) {
  const symobls = ["<", ">"];
  return (
    <div className="date-container">
      <div onClick={prevDate} className='date-container-date'>
        <p className='date-button'> {symobls[0]}</p>
      </div>
      <div className='date-container-date'>
        <p>{date}</p>
      </div>
      <div onClick={nextDate} className='date-container-date'>
        <p className='date-button'> {symobls[1]}</p>
      </div>
    </div>
  )
}
export default DateCard;
