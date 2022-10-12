import "./navbar.scss"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
           <img src="https://images.pexels.com/photos/1967902/pexels-photo-1967902.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="avatar"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
