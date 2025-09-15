# API de Transferências

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de APIs.

## Funcionalidades
- Registro de usuário (não permite duplicados)
- Login de usuário (usuário e senha obrigatórios)
- Consulta de usuários
- Transferência de valores (restrições para não favorecidos)
- Documentação Swagger disponível

## Regras de Negócio
1. Login e senha obrigatórios para login.
2. Não é possível registrar usuários duplicados.
3. Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Instalação
1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Execução
- Para rodar a API:
  ```bash
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Estrutura de Diretórios
- `controller/` - Rotas e controladores
- `service/` - Lógica de negócio
- `model/` - Dados em memória
- `app.js` - Configuração do app Express
- `server.js` - Inicialização do servidor
- `swagger.json` - Documentação da API

## Endpoints Principais
- `POST /users/register` - Registro de usuário
- `POST /users/login` - Login
- `GET /users` - Listar usuários
- `POST /transfers` - Realizar transferência
- `GET /transfers` - Listar transferências

## Observações
- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- Para testar, utilize ferramentas como Postman, Insomnia ou automação com Supertest.
