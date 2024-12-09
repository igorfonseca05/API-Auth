import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
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
        <div className="signup-page page">
            {/* <ToastContainer></ToastContainer> */}
            <div className="signup-form-container">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Nome</label>
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
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            placeholder="Digite sua senha"
                            required
                            name='password'
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirmar Senha</label>
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
                    <button type="submit" className="signup-btn" disabled={loading}>
                        {loading ? 'Carregando...' : "Cadastrar"}
                    </button>
                </form>
            </div>
            <div className="info-container">
                <h3>Bem-vindo à nossa comunidade!</h3>
                <p>
                    Ao criar uma conta conosco, você terá acesso a uma plataforma exclusiva de produtos frescos e deliciosos,
                    preparados especialmente para você. Não perca a chance de explorar nossa variedade de itens e promoções!
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
