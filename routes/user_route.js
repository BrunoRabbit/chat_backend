const router = require('express').Router();
const User = require('../src/auth/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const authenticateToken = require('../api/middleware/auth_middleware');
const upload = require('../api/middleware/images_middleware');

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const receiveData = await req.body;
    const user = new User(receiveData);
    await user.create();
    res.status(201).send(user);
  } catch (error) {
    res.status(error.code).json(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;

    const user = new User({ email, password });
    await user.load();
    const token = _createToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(error.code).json(error);
  }
});

router.post('/verify-token', async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(401).send('Invalid token');
    }

    jwt.verify(token, config.jwt.key_secret, async (err, decodedToken) => {
      try {
        if (err) {
          return res.status(401).send('Invalid token');
        }

        const userId = decodedToken.id;

        const user = new User({ id: userId });
        const obj = await user.findStoredTokenByID();

        const storedToken = obj['token'];

        if (storedToken !== null && storedToken === token) {
          return res.status(200).json({ token, user });
        }
      } catch (error) {
        res.status(error.code).json(error);
      }
    });

  } catch (error) {
    res.status(error.code).json(error);
  }
});

router.post('/logout', async (req, res) => {
  const userId = req.body.id;

  try {
    const user = new User({ id: userId });
    const obj = await user.findStoredTokenByID();

    if (!obj['token']) {
      return res.status(401).send('Token not found');
    }

    await user.updateToken(null);

    res.status(200).send('Token revoked successfully');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

function _createToken(user) {
  const token = jwt.sign({ id: user.id }, config.jwt.key_secret, { expiresIn: '2h' });

  user.saveToken(token);
  return token;
}

router.put('/:idUser', authenticateToken, async (req, res, next) => {
  try {
    const id = req.params.idUser;
    const receiveData = req.body;

    const data = Object.assign({}, receiveData, { id });
    const user = new User(data);
    await user.update();

    res.status(204);
    res.end();
  } catch (error) {
    res.status(error.code).json(error)
  }
});

module.exports = router;