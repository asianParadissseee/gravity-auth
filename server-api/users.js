const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const usersDB = {}; // временная in-memory база

const SECRET = 'supersecretkey'; // не для продакшена

function jsonResponse(message, data = null, status_code = 200, errors = null) {
    return {
        message,
        data,
        status_code,
        errors
    };
}

// 📝 Регистрация
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(422).json(jsonResponse("ValidationError", [], 422, {
            email: email ? undefined : ["Заполните поле"],
            password: password ? undefined : ["Заполните поле"],
        }));
    }

    if (usersDB[email]) {
        return res.status(400).json(jsonResponse("UserExists", null, 400, {
            email: "Пользователь уже зарегистрирован"
        }));
    }

    const hashed = await bcrypt.hash(password, 10);
    usersDB[email] = { email, password: hashed, name, role: "Администратор" };

    const token = jwt.sign({ email }, SECRET);
    res.json(jsonResponse("Registered", token));
});

// 🔐 Логин
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json(jsonResponse("ValidationError", [], 422, {
            email: email ? undefined : ["Заполните поле"],
            password: password ? undefined : ["Заполните поле"],
        }));
    }

    const user = usersDB[email];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json(jsonResponse("InvalidCredentials", null, 400, {
            auth: "Неверный логин или пароль"
        }));
    }

    const token = jwt.sign({ email }, SECRET);
    res.json(jsonResponse("LogedIn", token));
});

// 👤 Получение пользователя
router.get('/user', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json(jsonResponse("NotAuthenticated", [], 401, {
            auth: "Not authenticated"
        }));
    }

    try {
        const decoded = jwt.verify(auth, SECRET);
        const user = usersDB[decoded.email];
        if (!user) throw new Error();

        res.json(jsonResponse("UserInformation", {
            id: 1,
            name: user.name,
            email: user.email,
            role: {
                id: 1,
                name: user.role
            },
            permissions: []
        }));
    } catch (err) {
        res.status(401).json(jsonResponse("NotAuthenticated", [], 401, {
            auth: "Not authenticated"
        }));
    }
});

// 📧 Забыли пароль
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(422).json(jsonResponse("ValidationError", [], 422, {
            email: ["Заполните поле"]
        }));
    }

    if (!usersDB[email]) {
        return res.status(400).json(jsonResponse("InvalidEmail", null, 400, {
            email: "Пользователь не найден"
        }));
    }

    // В проде — отправка на почту
    res.json(jsonResponse("ResetLinkSent", "Письмо отправлено"));
});

module.exports = router;
