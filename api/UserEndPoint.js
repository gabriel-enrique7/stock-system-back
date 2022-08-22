const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');

require('dotenv').config();

router.post("/create", (req, res) => {
    const { name, email, password } = req.body;

    let isValidUser = true;

    if(!name) isValidUser = false;
    if(!email) isValidUser = false;
    if(!password) isValidUser = false;

    if(isValidUser) {
        User.findOne({ where: { email } })
            .then(user => {

                if(!user) {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);

                    User.create({
                        name,
                        email,
                        password: hash

                    }).then(() => {
                        res.status(201).end();

                    }).catch(() => res.status(500).end());
                
                } else {
                    res.status(409).end();
                }

        }).catch(() => res.status(500).end());

    } else {
        res.status(400).end();
    }
});

router.post("/authenticate", (req,res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
        .then(user => {

            if(user) {
                const isCorrect = bcrypt.compareSync(password, user.password);

                if(isCorrect) {
                    try {
                        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                            expiresIn: 86400000
                        });
    
                        res.status(200).json({
                            id: user.id,
                            name: user.name,
                            token
                        });
                    }
                    catch { res.status(500).end() }
                }
                res.status(401).end();
            }
            res.status(401).end();

        }).catch(() => res.status(500).end());
});

module.exports = router;