import React from 'react'
import './Page404.css'

import { Link } from 'react-router-dom';

function Page404() {
    return (
        <div className="not-found">
            <div className="content">
                <h1>404</h1>
                <p>Oops! Página não encontrada.</p>
                <Link to="/" className="back-home">
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
}

export default Page404