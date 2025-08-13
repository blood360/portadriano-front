const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Obtenha o token do cabeçalho
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada.' });
  }

  // Extrai o token do formato 'Bearer <token>'
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ msg: 'Formato de token inválido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido.' });
  }
};

module.exports = auth;
