const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/register', (req, res) => {
  try {
    const { username, password, favorecidos } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.registerUser({ username, password, favorecidos });
    res.status(201).json({ username: user.username, favorecidos: user.favorecidos });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    const user = userService.loginUser({ username, password });
    res.json({ username: user.username, favorecidos: user.favorecidos });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(userService.listUsers());
});

module.exports = router;
