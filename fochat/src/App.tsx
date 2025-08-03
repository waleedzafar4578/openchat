import './App.css';
import DashboardIcon from './elements/DashboardIcon';
import UserList from './elements/UserList';
import ChatScreen from './pages/ChatScreen';
import UserProfile from './components/UserProfile';
import UserLogin from './components/UserLogin';
import { useContext, useEffect, useState } from 'react';
import { WebSocketContext, WebSocketProvider } from './context/WsContext';

function App() {
  const [notificationText, setNotificationText] = useState<string>("");
  const [notificationFlag, setNotificationFlag] = useState(false);
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('WebSocketContext are not provided!');
  }
  const { userName, log, setUserLogout } = context;
  useEffect(() => {
    console.log(log);
    setNotificationText(log ? log : "");
    setNotificationFlag(true);
    setTimeout(() => {
      setNotificationFlag(false);
    }, 3000);

  }, [log]);
  const [mobileScreen, setMobileScreen] = useState(true);
  const [width, setWidth] = useState("0");
  const leave = () => {
    setUserLogout()
  }
  return (
    <WebSocketProvider>
      <div className="container">
        {notificationFlag && (
          <p className='notification'>{notificationText}</p>
        )}
        {userName ? (
          <div className="container">
            <div className='leave-button' onClick={leave}>
              <p>🚨</p>
            </div>
            {mobileScreen && (
              <div className='left-list-open' onClick={() => {
                setWidth("0");
                setMobileScreen(false);
              }}>
                <DashboardIcon />
              </div>
            )}
            <div className="left-container" style={{ left: `${width}%` }}>
              <div className="left-container-top">
                <div className="left-container-top-top" onClick={() => {
                  setWidth("-20");
                  setMobileScreen(true);
                }}>
                  <DashboardIcon />
                </div>
                <div className="left-container-top-bottom">
                  <UserList />
                </div>
              </div>
              <div className="left-container-bottom">
                <UserProfile />
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
        ) : (
          <div className='container'>
            <UserLogin />
          </div>
        )}
      </div>
    </WebSocketProvider>
  );
}

export default App;

