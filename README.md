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
   npm install express@4 apollo-server-express@3 graphql jsonwebtoken swagger-ui-express
   ```

## Execução

### API REST
- Para rodar a API REST:
  ```bash
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### API GraphQL
- Para rodar a API GraphQL:
  ```bash
  node graphql/server.js
  ```
- Playground GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)

#### Exemplo de Query
```graphql
query {
  users {
    username
    favorecidos
  }
}
```

#### Exemplo de Mutation (login)
```graphql
mutation {
  login(username: "Emival", password: "123456") {
    username
    token
  }
}
```

#### Exemplo de Mutation (transferência autenticada)
```graphql
mutation {
  transfer(from: "Emival", to: "Miriam", value: 100) {
    from
    to
    value
    date
  }
}
```
> Para mutations protegidas, envie o token JWT no header: `Authorization: Bearer <token>`

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
