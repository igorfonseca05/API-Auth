import React, { useEffect, useState } from 'react';
import './LoginPage.css'; // Importando o arquivo de estilo
import { toast, ToastContainer } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const LoginPage = () => {

    const [isMounted, setIsMounted] = useState(true)
    const { login, loading, error, success } = useAuth()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    function checkIfValid() {
        if (!isMounted) return
    }

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        checkIfValid()
        const success = await login(user)

        if (success) {
            setTimeout(() => navigate('/'), 2000)
        }
    }

    useEffect(() => {
        return () => {
            setIsMounted(false)
        }
    }, [])

    // console.log(user)

    return (
        <div className="login-page page">
            <div className="login-form-container">
                <div className="formTitle">
                    <h2>Bem vindo de volta</h2>
                    <p>Não possui conta? <Link to="/signup">SignUp</Link></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        {/* <label htmlFor="email">Email</label> */}
                        <span className='material-symbols-outlined icon_input'>email</span>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => handleChange(e)}
                            placeholder="E-mail"
                            required
                            name='email'
                            autoComplete='on'
                        />
                    </div>
                    <div className="input-group">
                        {/* <label htmlFor="password">Senha</label> */}
                        <span className='material-symbols-outlined icon_input'>password</span>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            placeholder="Senha"
                            required
                            name='password'
                            autoComplete='current-password'
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Carregando...' : 'Login'}</button>
                    <div className='separate'>
                        <p>ou</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
