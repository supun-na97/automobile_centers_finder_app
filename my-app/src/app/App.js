import {useState} from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import List from "../pages/user/List";
import {StoreProvider} from "../context/StoreComponent";
import RootStore from "../context/store/RootStore";
import "../style/dark.scss";
import "./style.css"
import {Routes, Route,} from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function AuthenticationContent (){

  return (
      <div className="app">
          <div className="sidebarContainer">
              <Sidebar/>
          </div>
        <div className="appContainer">
          <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user" element={<List/>}/>
                </Routes>
            </div>
        </div>
      </div>
  );
}

const App = () =>{
    const [rootStore] = useState(new RootStore());
      return (
          <StoreProvider store={rootStore}>
              {rootStore.userStore.isLogged ?
                  <AuthenticationContent/>
                  :
                  <Login/>
              }
          </StoreProvider>
      );
}

export default App;
