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

## Onde cada conceito do K6 foi aplicado no código

- **Thresholds**  
  Definido no objeto `options` do teste K6, por exemplo:  
  `thresholds: { http_req_duration: ['p(95)<2000'] }`  
  Arquivo: `test/k6/tranferencia.test.js`

- **Checks**  
  Utilizado para validar respostas das requisições, por exemplo:  
  `check(res, { 'register status 201 ou 400': (r) => r.status === 201 || r.status === 400 })`  
  Arquivo: `test/k6/tranferencia.test.js`

- **Helpers**  
  Funções auxiliares importadas de outros arquivos, como:  
  `import { getBaseUrl } from './helpers/getBaseUrl.js';`  
  `import { login } from './helpers/login.js';`  
  Arquivo: `test/k6/tranferencia.test.js`  
  Helpers estão em: `test/k6/helpers/`

- **Trends**  
  Métricas customizadas para análise de performance, exemplo:  
  `const transferTrend = new Trend('transfer_post_duration');`  
  `transferTrend.add(res.timings.duration);`  
  Arquivo: `test/k6/tranferencia.test.js`

- **Faker**  
  Geração de dados aleatórios para os testes:  
  `import faker from "k6/x/faker"`  
  `username = faker.person.firstName();`  
  Arquivo: `test/k6/tranferencia.test.js`

- **Variável de Ambiente**  
  Uso de variáveis como `BASE_URL` para configurar o endpoint:  
  `getBaseUrl()` lê a variável de ambiente `BASE_URL`  
  Arquivo: `test/k6/helpers/getBaseUrl.js`  
  Exemplo de execução:  
  `k6 run --env BASE_URL=http://localhost:3000 test/k6/login.test.js`

- **Stages**  
  Configuração de ramp-up e ramp-down de usuários virtuais:  
  ```js
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 },
  ]
  ```
  Arquivo: `test/k6/tranferencia.test.js`

- **Reaproveitamento de Resposta**  
  O token de autenticação obtido no login é reutilizado em requisições subsequentes:  
  ```js
  token = login(username, password);
  ...
  Authorization: `Bearer ${token}`
  ```
  Arquivo: `test/k6/tranferencia.test.js`

- **Uso de Token de Autenticação**  
  O token JWT é enviado no header das requisições protegidas:  
  ```js
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  ```
  Arquivo: `test/k6/tranferencia.test.js`

- **Data-Driven Testing**  
  Utilização de dados externos para alimentar os testes, por exemplo:  
  Arquivo de dados: `test/k6/data/login.test.data.json`  
  (Exemplo de uso pode ser visto em outros testes K6 do projeto)

- **Groups**  
  Organização dos testes em blocos lógicos:  
  ```js
  group('Registrar favorecido', function () { ... });
  group('Registrar usuário', function () { ... });
  group('Login', function () { ... });
  group('Transferência', function () { ... });
  ```
  Arquivo: `test/k6/tranferencia.test.js`

## Observações
- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- Para testar, utilize ferramentas como Postman, Insomnia ou automação com Supertest.
