import React, { useEffect, useState } from 'react';
import './LoginPage.css'; // Importando o arquivo de estilo
import { toast, ToastContainer } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const LoginPage = () => {

    const { login, loading, error, success } = useAuth()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(user)

        if (success) {
            setTimeout(() => navigate('/'), 2000)
        }
    }

    // console.log(user)

    return (
        <div className="login-page page">
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => handleChange(e)}
                            placeholder="Digite seu e-mail"
                            required
                            name='email'
                            autoComplete='on'
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            placeholder="Digite sua senha"
                            required
                            name='password'
                            autoComplete='current-password'
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Carregando...' : 'Login'}</button>
                </form>
            </div>
            <div className="info-container">
                <h3>Bem-vindo ao LOGOBAKERY!</h3>
                <p>
                    Somos uma empresa dedicada a oferecer os melhores produtos de confeitaria e padaria para você.
                    Entre em nossa plataforma para acessar nossos produtos exclusivos!
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
