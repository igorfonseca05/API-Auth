![Group 18](https://github.com/user-attachments/assets/9b79622d-c9d4-4029-a999-d9c6603b0a25)

# API de Autenticação


A API de autenticação foi projetada para fornecer um sistema seguro e eficiente de gerenciamento de autenticação e autorização. Abaixo estão as principais funcionalidades implementadas:

---

## **1. Registro de Usuários (User Registration)**

- Criação de contas de usuários com segurança, utilizando **hashing de senhas** com algoritmos robustos.
- Proteção dos dados sensíveis para garantir que as senhas nunca sejam armazenadas em texto simples.

---

## **2. Login de Usuários (User Login)**

- Validação de credenciais enviadas pelo cliente.
- Geração de **Access Tokens (JWT)** para autenticação de sessões.
- Envio do **Refresh Token** seguro via cookies com as flags `HttpOnly` e `Secure`, protegendo contra ataques XSS.

---

## **3. Validação de Tokens**

- Implementação de um sistema para validar **Access Tokens (JWT)** enviados nas requisições.
- Verificação automática da expiração do token por meio do campo `exp` no payload do JWT.
- Bloqueio de requisições não autorizadas com tokens inválidos ou expirados.

---

## **4. Renovação de Tokens (Token Refresh)**

- Utilização de **Refresh Tokens** para permitir a geração de novos **Access Tokens** quando o token atual expira, sem necessidade de relogar.
- Validação e proteção dos Refresh Tokens para evitar abusos e acessos indevidos.

---

## **5. Sistema de Expiração de Sessões**

- Configuração de um tempo de vida para os **Access Tokens** (curto, por segurança) e **Refresh Tokens** (mais longo, para conveniência do usuário).
- Monitoramento do estado do token no frontend, utilizando verificações locais da validade (`exp`) antes de realizar novas requisições.

---

## **6. Logout Seguro**

- Remoção dos tokens armazenados no cliente ao realizar o logout.
- Limpeza de cookies e dados de autenticação local para encerrar sessões de forma eficiente.

---

## **7. Fluxo de Tratamento de Erros**

- Tratamento robusto de erros, como tokens expirados ou inválidos, com respostas claras e seguras.
- Redirecionamento do usuário para o login em caso de problemas na autenticação.
- Integração com o frontend para exibir mensagens amigáveis ao usuário.

---

## **Tecnologias Utilizadas**

- **JWT (JSON Web Token)** para geração de tokens seguros e padronizados.
- **Hashing de senhas** com algoritmos como bcrypt (ou similar) para proteção de credenciais.
- **Cookies com HttpOnly e Secure** para envio seguro do Refresh Token.
- **Fetch API** no frontend para integração com a API de autenticação.

---

## **Vantagens**

- Autenticação robusta e segura, protegendo contra ataques comuns como XSS e roubo de sessão.
- Experiência de usuário melhorada com renovação automática de tokens.
- Estrutura modular e organizada, permitindo fácil manutenção e escalabilidade.
