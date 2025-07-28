import './App.css';
import DashboardIcon from './elements/DashboardIcon';
import UserList from './elements/UserList';
import ChatScreen from './pages/ChatScreen';
import InputBar from './elements/InputBar';

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
        <div className="right-container-left">
           <ChatScreen />
        </div>
        <div className="right-container-right">
            
        </div>
      </div>
    </div>
  );
}

export default App;

