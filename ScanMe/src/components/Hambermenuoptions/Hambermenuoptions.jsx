import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Hambermenuoptions.css';
import { menupics } from '../../assets/pictures/pictures';
import { icons } from '../../assets/icons/icons';

const Hambermenuoptions = ({ setopt }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setopt(false);
  };

  return (
    <>
      <div className="hamber-menu">
        <div className="hamber-menu-image">
          <img src={menupics.afterlife} alt="afterlife" />
        </div>
        <div  className="hamber-menu-options">
          <div className="hamber-menu-options-home">
            <img onClick={() => handleNavigation('/')} src={icons.home_icon} alt="home" />
          <p onClick={() => handleNavigation('/')}>Home</p>
          </div>
        <div className="hamber-menu-options-cart">
          <img onClick={() => handleNavigation('/added-items')} src={icons.pallet_icon} alt="pallet_icon" />
        <p onClick={() => handleNavigation('/added-items')}>Go to Pallet</p>
        </div>
        <button className="hamber-menu-button-option" onClick={() => setopt(false)}>close</button>
        </div>
      </div>
    </>
  );
};

export default Hambermenuoptions;
