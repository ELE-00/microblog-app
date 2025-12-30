//App.jsx
import React, {useEffect} from 'react';
import './styles/appLayout.css'
import { Outlet } from "react-router-dom";
import backBtn from './assets/backicon.png';
import { useNavigate, useLocation } from 'react-router-dom';

import SideNav from './components/SideNav';

export default function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const showBackButton = location.pathname !== "/";

    return (     
        <div className="appLayout">
            <div className="sideNavSection"> 
                <SideNav />
            </div>

            <div className="contentSection"> 
                {showBackButton &&
                <button className="backBtn" onClick={() => navigate(-1)}>
                    
                    <img className="backBtnIcon" src={backBtn} alt="backicon.png" ></img> 
                  
                </button>
                 }

                <Outlet />
            </div>
        </div>
    )
}



