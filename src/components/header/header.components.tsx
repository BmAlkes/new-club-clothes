import { BsCart3 } from "react-icons/bs";
import "./header.styles.css";

const Header = () => {
  return (
    <div className="header-container">
      <h2 className="header-title"> Club Clothings</h2>
      <div className="header-items">
        <div className="header-item">Explores</div>
        <div className="header-item">Login</div>
        <div className="header-item">Create Account</div>
        <div className="header-item">
          <BsCart3 size={25} /> <p style={{ marginLeft: 10 }}>5</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
