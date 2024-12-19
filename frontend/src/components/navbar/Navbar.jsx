import React, { useState } from 'react';
import './Navbar.css'; // Importando o arquivo CSS

import { NavLink, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
// import { ToastContainer } from 'react-toastify';

import { useAuthContext } from '../../Context/AuthContext';
import Dropdown from '../dropdown/Dropdown';

const Navbar = () => {

    const [dropIsOpen, setDropIsOpen] = useState(false)

    const { userAuth } = useAuthContext()

    return (
        <header className='page'>
            {/* <ToastContainer /> */}
            <nav className="navbar">
                <div className="logo">
                    <a href="#">Log</a>
                </div>
                <ul className="nav-links">
                    <li><NavLink to={'/'} >Home</NavLink></li>
                    <li><NavLink to={''}>About</NavLink></li>
                    {userAuth?.user && <li><NavLink to={'/dashboard'} >Dashboard</NavLink></li>}
                    {userAuth?.user && <li><NavLink to={'/profile'} >Profile</NavLink></li>}
                    {!userAuth?.user && <li><NavLink to={'/login'}>Login</NavLink></li>}
                    {!userAuth?.user && <li><NavLink to={'/signup'} className="contact-btn">Sign-up</NavLink></li>}
                    {userAuth?.user &&
                        <li className='user_infos' style={{ textTransform: 'capitalize' }} onClick={() => setDropIsOpen(!dropIsOpen)}>
                            <figure>
                                <img src="https://thumbs.dreamstime.com/b/opte-pelo-%C3%ADcone-do-perfil-avatar-placeholder-cinzento-da-foto-99724602.jpg" alt="" />
                            </figure>
                            {userAuth ? userAuth.user.name : 'User'}
                            <span className={`material-symbols-outlined dropIcon ${dropIsOpen && "rotate"}`}>
                                keyboard_arrow_down
                            </span>
                            <Dropdown dropIsOpen={dropIsOpen} setDropIsOpen={setDropIsOpen} />
                        </li>}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
