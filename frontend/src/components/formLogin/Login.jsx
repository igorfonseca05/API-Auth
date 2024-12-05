import React, { useState } from "react";
import "./Login.css"; // Importa o arquivo de estilos

const LoginForm = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    console.log(user)

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                    required
                    className="login-input"
                    name="email"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => handleChange(e)}
                    required
                    className="login-input"
                    name="password"
                />
                <button type="submit" className="login-button">
                    Entrar
                </button>
            </form>
            <div>
                <p>Não possui conta?</p>
                <a href="">Inscreva-se</a>
            </div>
        </div>
    );
};

export default LoginForm;
