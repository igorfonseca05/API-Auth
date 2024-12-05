import React from 'react';
import './Home.css'; // Arquivo CSS para estilizar a Home
import { useAuthContext } from '../../Context/AuthContext';

const Home = () => {

    const { userAuth } = useAuthContext()

    return (
        <div className="home-container page">
            <h1 className="home-title">Bem-vindo {userAuth?.user ? userAuth.user.name : "ao nosso site"}</h1>
            <p className="home-description">Este é um exemplo de página inicial. Use o menu acima para navegar para Login ou Signup.</p>
        </div>
    );
};

export default Home;
