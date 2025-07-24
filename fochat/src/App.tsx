import './App.css';
import DashboardIcon from './elements/DashboardIcon';
import UserList from './elements/UserList';
import ChatScreen from './pages/ChatScreen';


function App() {
  return (
    <div className="container">
      <div className="left-container">
        <div className="left-container-top">
          <div className="left-container-top-top">
            <DashboardIcon />
          </div>
          <div className="left-container-top-bottom">
             <UserList />
          </div>
        </div>
        <div className="left-container-bottom">
          <div className="left-container-bottom-top"></div>
          <div className="left-container-bottom-bottom"></div>
        </div>
      </div>

      <div className="right-container">
        <div className="right-container-top">
          <div className="right-container-top-left">
            <ChatScreen />
          </div>
          <div className="right-container-top-right"></div>
        </div>
        <div className="right-container-bottom">
          <div className="right-container-bottom-left"></div>
          <div className="right-container-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

