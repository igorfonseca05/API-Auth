import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import './SignUpPage.css'; // Importando o arquivo de estilo

// import useSignup from '../../hooks/useSignup';

import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

const SignUpPage = () => {

    const navigate = useNavigate()

    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null)
    const [user, setUser] = useState({ name: '', email: '', password: '' })

    const { loading, success, signUp, error: warning } = useAuth()


    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== confirmPassword) {
            return setError('As senhas devem coincidir')
        }

        const success = await signUp(user)

        if (success) {
            navigate('/')
        }
    };

    useEffect(() => {
        if (!warning) return

        setError(warning)

    }, [warning])


    // useEffect(() => {
    //     error && toast.error(error)
    //     success && toast.success(success)

    // }, [error, success])

    return (
        <div className="form-page page">
            {/* <ToastContainer></ToastContainer> */}
            <div className="form-container">
                <div className="formTitle">
                    <h2>Cadastre-se Agora</h2>
                    <p>Já oossui conta? <Link to="/login">SignIn</Link></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className='material-symbols-outlined icon_input'>person</span>
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(e) => handleChange(e)}
                            placeholder="Digite seu nome"
                            required
                            name='name'
                        />
                    </div>
                    <div className="input-group">
                        <span className='material-symbols-outlined icon_input'>mail</span>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => handleChange(e)}
                            placeholder="Digite seu e-mail"
                            required
                            name='email'
                        />
                    </div>
                    <div className="input-group">
                        <span className='material-symbols-outlined icon_input'>lock</span>
                        <input
                            type="lock"
                            id="password"
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            placeholder="Digite sua senha"
                            required
                            name='password'
                        />
                    </div>
                    <div className="input-group">
                        <span className='material-symbols-outlined icon_input'>lock</span>
                        <input
                            type="password"
                            id="confirm-password"
                            value={user.confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua senha"
                            required
                            name='confirmPassword'
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Carregando...' : "Cadastrar"}
                    </button>
                    <div className='separate'>
                        <p>ou</p>
                    </div>
                    <div className='buttons_container'>
                        <button><img src="google.svg" alt="" />Login com google</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
