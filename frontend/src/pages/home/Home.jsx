import React from 'react';
import './Home.css'; // Arquivo CSS para estilizar a Home
import { useAuthContext } from '../../Context/AuthContext';

import Navbar from '../../components/navbar/Navbar'

const Home = () => {

    const { userAuth } = useAuthContext()

    return (
        <>
            <section className="hero">
                <div className="hero-content home-container page">
                    <h1>Bem-vindo à nossa plataforma {userAuth?.user ? userAuth.user.name : "ao nosso site"}</h1>
                    <p>Gerencie suas credenciais de forma simples, segura e intuitiva.</p>
                    <a href="signup" className="btn-primary">Comece Agora</a>
                </div>
                <div className="hero-image">
                    <img src="https://via.placeholder.com/400x300" alt="Hero" />
                </div>
            </section>
            <div className="home-container page">

            </div>
        </>
    );
};

export default Home;
