import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import { useStores } from "../../context/StoreComponent";

const Sidebar = observer(() => {

  const { userStore } = useStores();

  const logOut = () => {
    userStore.logout();
  }

  return (
    <div className="sidebar">
    <div className="top">
      <Link to="/" style={{textDecoration: "none"}}>

     <span className="logo">Automobile Admin Panel</span>
     </Link>
    </div>
    <hr />
    <div className="center">
        <ul>
           <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration: "none"}}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{textDecoration: "none"}}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/companies" style={{textDecoration: "none"}}>
            <li>
              <StoreIcon className="icon" />
              <span>Companies</span>
            </li>
          </Link>
            <p className="title">USER</p>
            <li>
              <SettingsOutlinedIcon className="icon" />
            <span>Profile</span>
            </li>
            <li onClick={()=> logOut()}>
              <InputOutlinedIcon className="icon" />
            <span>Logout</span>
            </li>
        </ul>

    </div>
    </div>
  )
})

export default Sidebar
