const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');

router.post('/', (req, res) => {
  try {
    const { from, to, value } = req.body;
    if (!from || !to || typeof value !== 'number') return res.status(400).json({ error: 'Dados obrigatórios: from, to, value' });
    const transferencia = transferService.transfer({ from, to, value });
    res.status(201).json(transferencia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(transferService.listTransfers());
});

module.exports = router;
