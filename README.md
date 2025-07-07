# Tripleten web_project_api_full

##Descrição

Este projeto consiste em duas grandes fases:

Parte I: Implementação da autenticação e autorização com JWT no back-end e integração com o front-end em React.

Parte II: Validação, tratamento centralizado de erros, implantação em nuvem e configuração de domínio seguro com HTTPS.

##Tecnologias e Ferramentas Utilizadas
###Back-End

Node.js	- Ambiente de execução JavaScript no servidor.
Express.js - Framework web minimalista para construção de rotas e middlewares.
MongoDB	- Banco de dados NoSQL utilizado para armazenar usuários e cartões.
Mongoose - ODM para MongoDB. Facilita a modelagem dos dados.
dotenv - Carrega variáveis de ambiente a partir de um arquivo .env.
bcryptjs - Biblioteca para hash de senhas.
jsonwebtoken - (JWT)	Criação e verificação de tokens de autenticação.
cors - Middleware que habilita CORS (Cross-Origin Resource Sharing).
validator - Validação de campos como e-mails e URLs.

##Front-End
React.js - Biblioteca JavaScript para construção de interfaces interativas.
React Router DOM - Gerenciamento de rotas no front-end.
Context API - Compartilhamento de dados como o token JWT entre componentes.
localStorage - Armazenamento do token JWT no navegador.
Fetch API - Realização de requisições para a API back-end.
useEffect, useState, etc. - Hooks do React para manipulação de estado e ciclo de vida.
