import './elements.css';
import icon from '../assets/dashboard.png';

function DashboardIcon(){
  return(
    <div className="dashboard-icon-container">
      <img src={icon} />
    </div>
  );
}

export default DashboardIcon;
