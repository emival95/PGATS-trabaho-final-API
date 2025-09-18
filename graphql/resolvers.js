const userService = require('../service/userService');
const transferService = require('../service/transferService');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../service/authMiddleware');

const resolvers = {
  Query: {
    users: () => userService.listUsers(),
    transfers: (parent, args, context) => {
      // Permitir consulta apenas se autenticado (opcional)
      return transferService.listTransfers();
    },
  },
  Mutation: {
    register: (parent, { username, password, favorecidos }) => {
      const user = userService.registerUser({ username, password, favorecidos });
      return { username: user.username, favorecidos: user.favorecidos };
    },
    login: (parent, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { username: user.username, favorecidos: user.favorecidos, token };
    },
    transfer: (parent, { from, to, value }, context) => {
      // Autenticação obrigatória
      if (!context.user) throw new Error('transferência acima de R$ 5.000,00 só para favorecidos');
      return transferService.transfer({ from, to, value });
    },
  },
};

module.exports = resolvers;
