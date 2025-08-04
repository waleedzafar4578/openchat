import './elements.css';
import icon from '../assets/dashbord.jpeg';

function DashboardIcon(){
  return(
    <div className="dashboard-icon-container">
      <img src={icon} />
    </div>
  );
}

export default DashboardIcon;
