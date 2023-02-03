const { models } = require('../models');

async function get(req, res) {
    let email = req.body.email;
    let homes = await models.homes.findAll( {attributes:['homeID'] , where : {email}});
    if (homes) {
        res.status(200).json(homes);
    } else {
        homes = await models.homes.findAll();
        res.status(200).json(homes);
    }
};

async function create(req, res) {
    await models.homes.create(req.body);
    res.status(201).json({mesg : "Added Successfully"});
};

async function update(req, res) {
    const email = req.body.email;
    if(!email){
        res.status(400).send('400 - Bad Request');
    }
    await models.homes.update(req.body, {
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
    await models.homes.destroy({
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
