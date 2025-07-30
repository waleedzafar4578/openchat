import './App.css';
import DashboardIcon from './elements/DashboardIcon';
import UserList from './elements/UserList';
import ChatScreen from './pages/ChatScreen';
// import InputBar from './elements/InputBar';
import UserProfile from './components/UserProfile';
import UserLogin from './components/UserLogin';
import { useEffect, useState } from 'react';
function App() {
  const [userLogin, setUserLogin] = useState<Boolean>(false);
  useEffect(() => {
    let check = localStorage.getItem("userInfo");
    if (check) {
      setUserLogin(true)
    }
  }, [])

  return (
    <div className="container">
      {userLogin ? (
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
        <div >
          <UserLogin />
        </div>
      )}
    </div>
  );
}

export default App;

