import './elements.css';
import icon from '../assets/dashboardicon.jpg';

function DashboardIcon(){
  return(
    <div className="dashboard-icon-container">
      <img src={icon} />
    </div>
  );
}

export default DashboardIcon;
