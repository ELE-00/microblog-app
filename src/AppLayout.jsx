//App.jsx
import React, {useEffect} from 'react';
import './styles/appLayout.css'
import { Outlet } from "react-router-dom";

import SideNav from './components/sideNav';

export default function AppLayout() {

    return (     
        <div className="appLayout">
            <div className="sideNavSection"> 
                <SideNav />
            </div>

            <div className="contentSection"> 
                <Outlet />
            </div>
        </div>
    )
}



