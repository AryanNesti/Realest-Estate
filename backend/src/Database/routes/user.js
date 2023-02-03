const { models } = require('../models');

async function get(req, res) {
    let user = await models.user.findByPk(req.body.email);
    if (user) {
        res.status(200).json(user);
    } else {
        user = await models.user.findAll();
        res.status(200).json(user);
    }
};

async function create(req, res) {
    await models.user.create(req.body);
    res.status(201).end();
};

async function update(req, res) {
    const email = req.body.email;
    if(!email){
        res.status(400).send('400 - Bad Request');
    }
    await models.user.update(req.body, {
        where: {
            "email":email
        }
    });
    res.status(200).end();
};

async function remove(req, res) {
    const email = req.body.email;
    if(!email){
        res.status(400).send('400 - Bad Request');
    }
    await models.user.destroy({
        where: {
            "email":email
        }
    });
    res.status(200).end();
};

module.exports = {
    get,
    create,
    update,
    remove,
};
