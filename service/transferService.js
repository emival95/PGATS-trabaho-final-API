const { transfers } = require('../model/transferModel');
const { findUserByUsername } = require('./userService');

function transfer({ from, to, value }) {
  const remetente = findUserByUsername(from);
  const destinatario = findUserByUsername(to);
  if (!remetente || !destinatario) throw new Error('Usuário não encontrado');
  const isFavorecido = remetente.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) {
    throw new Error('Transferência acima de R$ 5.000,00 só para favorecidos');
  }
  const transferencia = { from, to, value, date: new Date() };
  transfers.push(transferencia);
  return transferencia;
}

function listTransfers() {
  return transfers;
}

module.exports = { transfer, listTransfers };
